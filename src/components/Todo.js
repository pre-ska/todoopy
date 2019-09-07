import React, { useState, useRef } from "react";
import "./Todo.css";
import useInputState from "../hooks/useInputState";

import Bounce from "react-reveal/Bounce";

const Todo = ({
  id,
  task,
  completed,
  removeTodo,
  updateTodo,
  toggleTodo,
  i
}) => {
  const [isEditing, toggleEditing] = useState(false);

  const [value, handleChange] = useInputState(task);

  const [out, setOut] = useState(false);

  const refLeft = useRef(null);
  const refRight = useRef(null);

  const handleRemove = () => {
    setOut(true);
    setTimeout(() => {
      removeTodo(id);
    }, 500);

    // refLeft.current.parentNode.parentNode.className = "testAnim";
    // setTimeout(() => {
    //   refLeft.current.parentNode.parentNode.style.height = "0";
    // }, 250);
    // setTimeout(() => {
    //   removeTodo(id);
    // }, 500);
  };

  const toggleForm = () => {
    if (!completed) toggleEditing(!isEditing);
  };

  const handleUpdate = e => {
    e.preventDefault();
    updateTodo(id, value);
    toggleEditing(false);
  };

  const handleToggle = () => toggleTodo(id);

  return (
    <Bounce left opposite delay={i * 50} collapse appear={true} when={!out}>
      <div className={completed ? "Todo completed" : "Todo"}>
        <div
          className="Todo-left"
          ref={refLeft}
          style={!isEditing ? { top: " 1.5rem" } : { top: " -3.8rem" }}>
          <div>
            <li className="Todo-task" onClick={handleToggle}>
              {task}
            </li>
          </div>

          <form className="Todo-edit-form" onSubmit={handleUpdate}>
            <input
              type="text"
              value={value}
              name="task"
              onChange={handleChange}
            />
            <button>Save</button>
          </form>
        </div>
        <div className="Todo-buttons" ref={refRight}>
          <button onClick={toggleForm}>
            <i className="fas fa-pen" />
          </button>
          <button onClick={handleRemove}>
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    </Bounce>
  );
};

export default Todo;
