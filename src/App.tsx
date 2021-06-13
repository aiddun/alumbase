import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./pages/register/Register";
import Nav, { NavPage } from "./Nav";
import Profile from "./pages/profile/Profile";
import { auth } from "./util/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase/app";
import Members from "./pages/users/Members";

const links: NavPage[] = [
  { name: "Members", path: "/members" },
  { name: "Jobs", path: "/jobs" },
];

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function App() {
  const [count, setCount] = useState(0);

  const [user] = useAuthState(auth);

  return (
    <div className="App bg-gray-50 h-full w-full font-sans">
      <Router>
        <div>
          <Nav pages={links} />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/members">
              <Members />
            </Route>
            <Route path="/jobs">
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
              <p>{JSON.stringify(auth.currentUser)}</p>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
