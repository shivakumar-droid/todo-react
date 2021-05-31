import React, { useContext } from "react";
import { Context } from "./Context";
import TodoItem from "./TodoItem";

//passing individual todo to todoItem component

interface Todos {
  todo: any;
}

function Todos() {
  const { todos } = useContext(Context);

  const individualTodo = todos.map((todo: any) => (
    <TodoItem key={todo.id} id={todo.id} task={todo.task} todo={todo} />
  ));

  return <div>{individualTodo}</div>;
}

export default Todos;
