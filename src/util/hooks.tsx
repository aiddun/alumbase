import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { definitions } from "../../types/supabase";
import { AuthContext } from "./AuthUtil";

export const useUser = () => {
  return useContext(AuthContext);
};
