import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Auth from "../components/Auth";

export const AuthContext = React.createContext<any>(undefined);

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setAuthUser(session?.user ?? null);

    const syncUserData = async () => {
      setDataUser(
        (await supabase.from("users").select().eq("id", session?.user?.id))
          ?.body[0]
      );
      setLoading(false);
    };

    syncUserData();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthUser(session?.user ?? null);
        syncUserData();
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const updateUser = async (updates: any) => {
    // todo: add usetoast for error

    let { error } = await supabase.from("users").upsert(
      { id: authUser?.id, ...updates },
      {
        returning: "minimal", // Don't return the value after inserting
      }
    );

    if (error) {
      throw error;
    }

    setDataUser({ ...dataUser, ...updates });
  };

  const value = {
    authUser,
    dataUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Auth/> : children}
    </AuthContext.Provider>
  );
}
