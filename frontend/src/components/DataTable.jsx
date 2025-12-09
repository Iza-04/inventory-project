import React from "react";
import "../styles/table.css";

export default function DataTable({ columns, data }) {
  return (
    <div
      className="table-container"
      style={{ position: "relative", zIndex: 1 }}
    >
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={col.onClick}
                className={col.sortable ? "sortable" : ""}
                style={{ userSelect: "none" }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!data || data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty-cell">
                No data
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id ?? JSON.stringify(row)}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
