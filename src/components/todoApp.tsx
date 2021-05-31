import React, { useState } from "react";
import LoginForm from "./LoginForm";
import AddTodo from "./AddTodo";
import Todos from "./Todos";
import { useHistory } from "react-router-dom";
import "./App.css";
import firebase from "./firebase";

function TodoApp() {
  const [error, setError] = React.useState<any>();
  const [user, setUser] = React.useState<any>({ id: "", name: "", email: "" });
  const history = useHistory();

  const ref = firebase.firestore().collection("users");

  const Login = (details: any) => {
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          details.email == doc.data().email &&
          details.password == doc.data().password
        ) {
          setUser({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
          });
        } else {
          setError("Details Do not match!");
        }
      });
    });
  };//validating the form

  localStorage.setItem("email", user.id);

  const Logout = () => {
    setUser({ name: "", email: "" });
    setError("");
    history.push("/");
  };//navigate to login page

  const userP = () => {
    history.push("/user");
  };//navigate to user profile page

  return (
    <div>
      {(user && user.email != "") || localStorage.getItem("email") ? (
        <div>
          <div className="logout">
            <button onClick={Logout}>Logout</button>
            <button onClick={userP}>Profile</button>
          </div>
          <div className="header">
            <h1>Todo App</h1>
          </div>
          <div className="App">
            <AddTodo />
            <Todos />
          </div>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default TodoApp;
