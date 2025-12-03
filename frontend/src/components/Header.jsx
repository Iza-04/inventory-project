import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: 20, background: "#eee" }}>
      <h2>Inventory App</h2>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>{" "}
        | <NavLink to="/inventory">Inventory</NavLink> |{" "}
        <NavLink to="/admin">Admin</NavLink> |{" "}
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
}
