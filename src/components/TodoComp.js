import React from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
// import { useUserAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

const TodoComp = () => {
  //   const navigate = useNavigate();

  return (
    <div>
      <NewTodoForm />

      <TodoList />
    </div>
  );
};

export default TodoComp;
