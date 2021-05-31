import React, { useState } from "react";
import AddTodo from "./AddTodo";
import Todos from "./Todos";
import { useHistory } from "react-router-dom";
import "./App.css";

//Compoenent to add Todo

function Todo() {
  const history = useHistory();

  const Logout = () => {
    history.push("/");
  };

  const userP = () => {
    history.push("/user");
  };

  return (
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
  );
}

export default Todo;
