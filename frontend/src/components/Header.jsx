import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Inventory</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
