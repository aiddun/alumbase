import React, { useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Auth from "../components/Auth";
import { definitions } from "../../types/supabase";
import { User as AuthUser } from "@supabase/supabase-js";

type DataUser = definitions["members"];

export const AuthContext = React.createContext<any>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>();
  const [dataUser, setDataUser] = useState<DataUser | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setAuthUser(session?.user ?? null);

    const syncUserData = async () => {
      const userDatas = (
        await supabase.from("members").select().eq("id", session?.user?.id)
      ).data;
      if (userDatas?.length === 1) {
        const userData = userDatas[0];
        console.log(userData);
        setDataUser(userData);
      } else {
        // TODO
      }
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

  const updateUser = async (updates: Partial<DataUser>, noUpsert = false) => {
    // todo: add usetoast for error

    const payload = [
      { id: authUser?.id, ...updates },
      {
        returning: "minimal", // Don't return the value after inserting
      },
    ];

    let { error } = await (noUpsert
      // Compiler is wrong
      // @ts-ignore
      ? supabase.from("members").update(...payload)
      // @ts-ignore
      : supabase.from("members").upsert(...payload));
      
      if (error) {
        throw error;
      }
      
    // @ts-ignore
    setDataUser({ ...dataUser, ...updates });
  };

  const value = {
    authUser,
    dataUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!supabase.auth.session()?.user || loading ? <Auth /> : children}
    </AuthContext.Provider>
  );
}
