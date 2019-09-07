import React from "react";
import "./NewTodoForm.css";
import useInputState from "../hooks/useInputState";

const NewTodoForm = ({ create }) => {
  const [value, handleChange, reset] = useInputState("");

  const handleSubmit = e => {
    e.preventDefault();

    let value_ = value.trim();

    if (value_ !== "") {
      create(value_);
      reset();
    }
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Todo"
        id="task"
        name="task"
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodoForm;
