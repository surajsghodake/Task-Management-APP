import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavbarComp = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Navbar
        expand="lg"
        bg="secondary"
        data-bs-theme="secondary"
        className="sticky fixed-top"
      >
        <Container>
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="text-black text-decoration-none" to="/">
                Home
              </Link>
            </Nav>
            <Nav>
              {!user && (
                <div className="d-flex">
                  <Link
                    to="/login"
                    className="rounded me-2 text-black p-1 px-2 text-decoration-none"
                    style={{ background: "rgb(66, 133, 244)" }}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded me-4 text-black py-1 px-2 text-decoration-none"
                    style={{ background: "rgb(66, 133, 244)" }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              {user && (
                <div className="d-flex">
                  <p className="d-flex align-items-center justify-content-center">
                    {user.email.split("@")[0]}
                  </p>
                  <Button
                    className="rounded text-white ms-4"
                    style={{ background: "#b23b3b" }}
                    onClick={handleClick}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
