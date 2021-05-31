import React, { useContext } from "react";
import { Context } from "./Context";
import "./addtodo.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { Checkbox } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FlipMove from 'react-flip-move';

interface Props {
  todo: any;
  task: any;
  id: any;
}

const TodoItem: React.FC<Props> = ({ todo, task, id }) => {
  const { markComplete, deleteTodo, editTodo } = useContext(Context);

  function getStyle() {
    return {
      textDecoration: todo.completed && "line-through",
    };
  }//linethrough line decoration when task is completed

  return (
    <div className="list" style={getStyle()}>
      <FlipMove duration={300} easing="ease-in-out">
      <Checkbox
        id="check"
        onChange={() => markComplete(id)}
        style={{ color: "white", margin: "0.2em" }}
      />
      <label style={{ fontSize: "20px", margin: "0.2em" }}>{task}</label>
      <span style={{ float: "right", margin: "0.9em" }}>
        <EditIcon
          className="edit"
          onClick={(e) => editTodo(id, task)}
          style={{ color: "black" }}
        />
        <DeleteIcon
          className="delete"
          onClick={() => deleteTodo(id)}
          style={{ color: "black" }}
        />
      </span>
      </FlipMove>
    </div>
  );
};

export default TodoItem;
