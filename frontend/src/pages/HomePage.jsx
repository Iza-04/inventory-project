import React from "react";
import "../styles/table.css";

export default function HomePage() {
  const employees = [
    { id: 1, name: "Iza M", role: "Admin" },
    { id: 2, name: "R M", role: "Manager" },
    { id: 3, name: "M A", role: "Employee" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome</h1>
      <p>Sample of employee's table:</p>

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
