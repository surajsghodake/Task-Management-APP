// import { useEffect, useState } from "react";
import "./style.css";
// import NewTodoForm from "./components/NewTodoForm";
// import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import TodoComp from "./components/TodoComp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Container className="mt-5 d-flex align-items-center justify-content-center">
        <div className="App w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TodoComp />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/forgot-password" element={<ForgortPassword />} /> */}
            </Routes>
          </AuthProvider>
        </div>
      </Container>
    </>
  );
}

export default App;
