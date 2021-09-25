import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import APIService from "../APIService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["loginToken"]);
  const [logUser, setLogUser] = useCookies(["fname"]);
  const [isLogin, setLogin] = useState(true);
  let history = useHistory();

  //   For Registration Only
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (token["loginToken"]) {
      history.push("/home");
    }
  }, [token]);

  const loginBtn = () => {
    APIService.LoginUser({
      username: username,
      password: password,
    })
      .then((response) => {
        setToken("loginToken", response.token);
        setLogUser("fname", response.fname);
      })
      .catch((error) => console.log(error));
  };

  const registerBtn = () => {
    APIService.CreateUser({
      username: username,
      first_name: fname,
      last_name: lname,
      email: email,
      password: password,
    })
      .then(() => setLogin(true))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container" style={{ marginTop: "10em" }}>
      {isLogin ? (
        <h1 className="text-white">Login Page</h1>
      ) : (
        <h1 className="text-white">Registration Page</h1>
      )}

      <hr className="bg-white" />
      <label htmlFor="username" className="form-label text-light">
        Username
      </label>
      <input
        type="text"
        className="form-control"
        id="username"
        placeholder="Enter username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {isLogin ? null : (
        <div className="text-white">
          <br />
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="Enter first name..."
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Enter last name..."
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
      <br />
      <label htmlFor="username" className="form-label text-light">
        Password
      </label>
      <input
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {isLogin ? (
        <button onClick={loginBtn} className="btn btn-primary">
          Login
        </button>
      ) : (
        <button onClick={registerBtn} className="btn btn-primary">
          Register
        </button>
      )}

      <div className="mb-3 text-white">
        <br />
        {isLogin ? (
          <h5>
            If you don't have an account, please
            <button
              className="btn btn-primary mx-3"
              onClick={() => setLogin(false)}
            >
              Register
            </button>
            here
          </h5>
        ) : (
          <h5>
            If you have an account,
            <button
              className="btn btn-primary mx-3"
              onClick={() => setLogin(true)}
            >
              Login
            </button>
            here
          </h5>
        )}
      </div>
    </div>
  );
};

export default Login;
