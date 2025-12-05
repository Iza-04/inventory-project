import React from "react";
import "../styles/table.css";

export default function HomePage() {
  const columns = [
    { key: "id", title: "ID сотрудника" },
    { key: "name", title: "Имя" },
    { key: "role", title: "Должность" },
  ];

  const sampleEmployees = [
    { id: 1, name: "Iza R M", role: "Admin" },
    { id: 2, name: "Iza M", role: "Manager" },
    { id: 3, name: "E M", role: "Employee" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Добро пожаловать в систему инвентаря</h1>
      <p>Ниже пример таблицы сотрудников:</p>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sampleEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
