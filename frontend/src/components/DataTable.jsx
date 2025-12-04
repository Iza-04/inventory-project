import { useState } from "react";
import "../styles/table.css";

export default function DataTable({ columns, data }) {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [gotoId, setGotoId] = useState("");

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginated = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleGoto = () => {
    const id = Number(gotoId);
    if (!id) return;
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const targetPage = Math.floor(index / rowsPerPage) + 1;
      setPage(targetPage);
    }
  };

  return (
    <div>
      {/* Навигация */}
      <div className="pagination-bar">
        <button disabled={page === 1} onClick={() => setPage(1)}>
          ≪
        </button>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ‹
        </button>

        <span className="page-number">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          ›
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
        >
          ≫
        </button>

        {/* Поиск по ID */}
        <input
          type="number"
          placeholder="ID"
          value={gotoId}
          onChange={(e) => setGotoId(e.target.value)}
        />
        <button onClick={handleGoto}>Push</button>
      </div>

      {/* Таблица */}
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
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No data
                </td>
              </tr>
            ) : (
              paginated.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
