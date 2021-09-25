import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "./index.css";

import App from "./App";
import Login from "./components/Login";

function AuthRouter() {
  return (
    // We want to save the token inside a cookie so that the user stays logged in until either he/she quits the browser or logs out.
    <CookiesProvider>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={App} />
      </Router>
    </CookiesProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
