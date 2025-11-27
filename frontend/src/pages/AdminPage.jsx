import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => setUsers([]));
  }, []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Имя" },
    { key: "email", title: "Email" },
    { key: "role", title: "Роль" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Админ панель</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
