import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/table.css";

export default function Header() {
  return (
    <header
      style={{
        padding: 14,
        background: "#f5f7fb",
        borderBottom: "1px solid #e6eefc",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Inventory App</h2>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Inventory
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admin
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
