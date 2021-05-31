import React, { useContext, useEffect, useRef } from "react";
import { Context } from "./Context";
import "./App.css";

//Add Todo

function AddTodo() {
  const { addTodo, input, setInput, edit } = useContext(Context);
  const addtodo = React.useRef<any>();

  useEffect(() => {
    addtodo.current.focus();
  }); //Autofocus on todo input field

  return (
    <div>
      <div>
        <form id="to-do-form" onSubmit={(e) => addTodo(e)}>
          <input
            type="text"
            placeholder="Type your todo here"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            ref={addtodo}
          ></input>
          {"  "}
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
