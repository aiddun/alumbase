import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/ui";
// import { ProfileContext } from "./util/hooks";

interface TotalUser {
  auth: User;
  data: any;
}


ReactDOM.render(
  <React.StrictMode>
    {/* <UserContext> */}
    {/* <p>hello</p> */}
      <App />
    {/* </UserContext> */}
  </React.StrictMode>,
  document.getElementById("root")
);
