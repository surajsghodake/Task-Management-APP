import React from "react";
import { useUserAuth } from "../context/AuthContext";

function TodoItem({ id, title, completed }) {
  const { toggleTodo, deleteTodo } = useUserAuth();
  return (
    <>
      <li key={id}>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          {title}
        </label>
        <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </li>
    </>
  );
}

export default TodoItem;
