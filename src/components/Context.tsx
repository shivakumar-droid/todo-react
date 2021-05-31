import React, { useState, useEffect } from "react";
import firebase from "./firebase";

const Context = React.createContext<any>("");

interface IProps {
  children: any;
  // any other props that come into the component
}

function ContextProvider({ children }: IProps) {
  const [input, setInput] = useState("");
  const [todos, setTodos] = React.useState<any>([]);
  const [edit, setEdit] = useState(false);
  const [inputId, setInputId] = useState("");

  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []); // blank to run only on first launch

  function getTodos() {
    firebase
      .firestore()
      .collection("todo")
      .onSnapshot(function (querySnapshot) {
        setTodos(
          querySnapshot.docs.map((doc) => ({
            task: doc.data().todo,
            id: doc.id,
            completed: false,
          }))
        );
      });
  }

  // Toggle complete

  function markComplete(id: any) {
    const updatedArr = todos.map((todo: any) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedArr);
  }

  function editTodo(id: any, task: any) {
    console.log(id);
    setInputId(id);
    setInput(task);
    setEdit(true);
  }

  function deleteTodo(id: any) {
    firebase.firestore().collection("todo").doc(id).delete();
    const updatedArr = todos.filter((todo: any) => todo.id !== id);
    setTodos(updatedArr);
    setInput("");
  }

  // Add todo

  function addTodo(e: any) {
    e.preventDefault();
    console.log(todos);
    const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
    if (inputId && edit) {
      firebase.firestore().collection("todo").doc(inputId).update({
        todo: input,
      });
      setInput("");
      setInputId("");
      setEdit(false);
    }
    if (input && !inputId && !edit) {
      setTodos([...todos, { task: input, id, completed: false }]);
      firebase
        .firestore()
        .collection("todo")
        .add({
          id: id + 1,
          todo: input,
          email: localStorage.getItem("email"),
          completed: false,
        });
      setInput("");
    }
  }

  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        markComplete,
        deleteTodo,
        addTodo,
        editTodo,
        edit,
        input,
        setInput,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
