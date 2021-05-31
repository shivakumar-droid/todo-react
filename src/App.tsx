import TodoApp from "./components/todoApp";
import { Route, Switch } from "react-router-dom";
import Todo from "./components/todo";
import SignUp from "./components/signUp";
import React from "react";
import User from "./components/user";
import PrivateRoute from "./components/privateRouter";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <TodoApp />
      </Route>
      <PrivateRoute exact={true} path="/user" component={User} />
      <Route path="/register">
        <SignUp />
      </Route>
      <PrivateRoute exact={true} path="/todo" component={Todo} />
    </Switch>
  );
}

export default App;