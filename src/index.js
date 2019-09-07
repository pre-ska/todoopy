import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoList from "./components/TodoList";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<TodoList />, document.getElementById("root"));

serviceWorker.register();
