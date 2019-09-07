import React, { useState, useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import logo from "../assets/git.png";
import snoopy from "../assets/snoopy.png";
import TransitionGroup from "react-transition-group/TransitionGroup";
import uuid from "uuid/v4";

const TodoList = () => {
  const tmp =
    '[{"task":"learn react","id":"7649c2d9-1f78-43a7-ae25-38598a6ce448","completed":true},{"task":"get rič","id":"7f4303ad-65c6-4241-9894-c6a06e5aee42","completed":false},{"task":"ツ","id":"ef77c522-2662-47f1-a04b-5cedd6e4203d","completed":false}]';
  let initialState = () => JSON.parse(localStorage.getItem("todo_4") || tmp);

  const [todos, setTodos] = useState(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("todo_4", JSON.stringify(todos));
    }, 800);

    return () => clearTimeout(timer);
  }, [todos]);

  const create = newTodo =>
    setTodos([{ task: newTodo, id: uuid(), completed: false }, ...todos]);

  const remove = id => setTodos(todos.filter(t => t.id !== id));

  const update = (id, updatedTask) =>
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, task: updatedTask } : todo
      )
    );

  const toggleCompletion = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  let groupProps = {
    appear: true,
    enter: true,
    exit: true
  };

  return (
    <div className="TodoList">
      <a
        href="https://github.com/pre-ska/todoopy"
        target="_blank"
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          opacity: "0.4"
        }}>
        <img src={logo} alt="aaa" />
      </a>
      <div className="top">
        <h1>Todo</h1>
        <h1
          style={{
            opacity: "0.5"
          }}>
          opy
        </h1>
        <br /> <span>...or not todo</span>{" "}
        <div className="snoopy">
          <img src={snoopy} alt="" />
        </div>
      </div>
      <NewTodoForm create={create} />
      <ul>
        <div className="todo-list">
          <TransitionGroup {...groupProps}>
            {todos.map((todo, i) => (
              <Todo
                key={todo.id}
                i={i}
                id={todo.id}
                task={todo.task}
                completed={todo.completed}
                removeTodo={remove}
                updateTodo={update}
                toggleTodo={toggleCompletion}
              />
            ))}
          </TransitionGroup>
        </div>
      </ul>
    </div>
  );
};

export default TodoList;
