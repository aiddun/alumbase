import { User } from "@supabase/supabase-js";
import Auth from "./components/Auth";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { definitions } from "../types/supabase";
import Nav, { NavPage } from "./Nav";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Members from "./pages/users/Members";
import { supabase } from "./supabaseClient";
import { useUser } from "./util/hooks";
import Reset from "./pages/reset/Reset";
import { Redirect } from "react-router";
import { AuthProvider } from "./util/AuthUtil";

const links: NavPage[] = [
  { name: "Members", path: "/members" },
  // { name: "Jobs", path: "/jobs" },
];

// TODO: GLOBAL PROFILE STATE MANAGEMENT -> ONBOARDING, SEARCH

function App() {
  // const { user } = useUser();
  const [recoveryToken, setRecoveryToken] = useState<any>(null);

  useEffect(() => {
    /* Recovery url is of the form
     * <SITE_URL>#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery
     * Read more on https://supabase.io/docs/reference/javascript/reset-password-email#notes
     */
    let url = window.location.hash;
    let query: string = url.substr(1);
    let result: any = {};

    query.split("&").forEach((part) => {
      const item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result.type === "recovery") {
      setRecoveryToken(result.access_token);
      alert(result.access_token);
    }
  }, []);

  return (
    <div className="App bg-gray-50 h-full w-screen font-sans">
      <Router>
        <AuthProvider>
          <div>
            <Nav pages={links} />
            {recoveryToken && (
              <Reset
                recoveryToken={recoveryToken}
                setRecoveryToken={setRecoveryToken}
              />
            )}

            <Switch>
              <Route exact path="/">
                <Redirect to="/members" />
              </Route>
              <Route path="/members">
                <Members />
              </Route>
              {/* <Route path="/jobs"></Route> */}
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
