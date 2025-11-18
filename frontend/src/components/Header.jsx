import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h2>Inventory App</h2>
      <nav>
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
    </header>
  );
}
