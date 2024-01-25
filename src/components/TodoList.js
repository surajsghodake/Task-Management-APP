import React from "react";
import TodoItem from "./TodoItem";
import { useUserAuth } from "../context/AuthContext";

function TodoList() {
  const { todos } = useUserAuth();
  return (
    <>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return <TodoItem {...todo} key={todo.id} />;
        })}
      </ul>
    </>
  );
}

export default TodoList;
