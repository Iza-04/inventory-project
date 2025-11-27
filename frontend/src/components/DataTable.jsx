export default function DataTable({ columns, data }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                padding: 10,
                borderBottom: "2px solid #ddd",
                textAlign: "left",
              }}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              style={{ padding: 20, textAlign: "center" }}
            >
              Нет данных
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{
                    padding: "8px 10px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
