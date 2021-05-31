import React, { useState, useEffect } from "react";
import "./loginForm.css";
import firebase from "./firebase";
import { useHistory } from "react-router-dom";

//SignUp form

function SignUp() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    path: "",
    password: "",
    cpassword: "",
    phone: "",
    country: "",
    city: "",
  });
  const [error, setError] = React.useState<any>();
  const [emailerror, setemailError] = useState();
  const [logged, setLogged] = React.useState<any>();
  const history = useHistory();

  const ref = firebase.firestore().collection("users");

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (details.password !== details.cpassword) {
      setError("Password did'nt match");
    }

    if (!emailerror && !error) {
      firebase.firestore().collection("users").add({
        name: details.name,
        email: details.email,
        path: details.path,
        password: details.password,
        phone: details.phone,
        country: details.country,
        city: details.city,
      });
      setLogged("yes");
      return;
    }
  };//fetching user details

  const loginAlert = (e: any) => {
    if (logged) {
      alert("Registered Succesfully!!");
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner-sign">
        <h2>Register</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>
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
            type="phone"
            placeholder="Phone"
            name="phone"
            id="phone"
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
            value={details.phone}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            id="country"
            onChange={(e) =>
              setDetails({ ...details, country: e.target.value })
            }
            value={details.country}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            name="city"
            id="city"
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
            value={details.city}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
          <br />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            id="cpassword"
            onChange={(e) =>
              setDetails({ ...details, cpassword: e.target.value })
            }
            value={details.cpassword}
          />
          <br />
          {error != "" ? <div className="error">{error}</div> : ""}
          <button value="LOGIN" onClick={loginAlert}>
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
