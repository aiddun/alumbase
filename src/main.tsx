import React from "react";
import ReactDOM from "react-dom";
// import { ProfileContext } from "./util/hooks";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./util/AuthUtil";

ReactDOM.render(
  <React.StrictMode>
    {/* <UserContext> */}
    {/* <p>hello</p> */}
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
    {/* </UserContext> */}
  </React.StrictMode>,
  document.getElementById("root")
);
