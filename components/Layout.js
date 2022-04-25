import React from "react";
import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar
        bg="light"
        expand="lg"
        className="fixed-top navbar navbar-dark bg-dark py-3"
      >
        <Container>
          <Navbar.Brand href="/" as={Link}>
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="ms-5 d-flex justify-content-between "
              style={{ width: "12rem" }}
            >
              <div>
                <Nav.Link as={Link} href="/addevent">
                  add event
                </Nav.Link>
              </div>
              <div>
                <Nav.Link as={Link} href="/past">
                  past events
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-5">{children}</div>
    </div>
  );
};

export default Layout;
