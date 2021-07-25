import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { definitions } from "../../types/supabase";
import { AuthContext } from "./AuthUtil";
import { User as AuthUser } from "@supabase/supabase-js";

type DataUser = definitions["members"];
interface User {
  dataUser: DataUser;
  authUser: AuthUser;
}

export const useUser = (): {
  dataUser: DataUser;
  authUser: AuthUser;
  updateUser: (user: Partial<DataUser>, noUpsert?: boolean) => void;
} => {
  return useContext(AuthContext);
};
