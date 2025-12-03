import React from "react";
import "../styles/table.css";

export default function HomePage() {
  const employees = [
    { id: 1, name: "Азамат", role: "Администратор" },
    { id: 2, name: "Дильнора", role: "Менеджер" },
    { id: 3, name: "Бехзод", role: "Складской сотрудник" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Добро пожаловать</h1>
      <p>Пример таблицы сотрудников:</p>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Должность</th>
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
