import React from "react";
import "../styles/table.css";

export default function HomePage() {
  const employees = [
    { id: 1, name: "Name1", role: "Administartor" },
    { id: 2, name: "Name2", role: "Manager" },
    { id: 3, name: "Name3", role: "Employee" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome</h1>
      <p>Employee table:</p>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
