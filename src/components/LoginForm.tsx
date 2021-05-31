import React, { useState } from "react";
import "./loginForm.css";
import { useHistory } from "react-router-dom";

//Login Form

interface Props {
  Login: any;
  error: any;
}

const LoginForm: React.FC<Props> = ({ Login, error }) => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const history = useHistory();

  const submitHandler = (e: any) => {
    e.preventDefault();

    Login(details);
  };//Submithandler to call login function

  const signup = (e: any) => {
    history.push("/register");
  };//function to redirect to register page

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="pasword"
            placeholder="Password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
          {error != "" ? <div className="error">{error}</div> : ""}
          <button value="LOGIN">LOGIN</button>
        </div>
        <div className="signup">
          <button value="LOGIN" onClick={signup}>
            SIGN UP
          </button>
        </div>
        {/* <input className="button" type="submit" value="LOGIN" /> */}
      </div>
    </form>
  );
};

export default LoginForm;
