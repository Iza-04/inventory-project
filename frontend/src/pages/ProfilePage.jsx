import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function ProfilePage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("/api/profile/history")
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch(() => setHistory([]));
  }, []);

  const columns = [
    { key: "date", title: "Дата" },
    { key: "action", title: "Действие" },
    { key: "details", title: "Описание" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Профиль</h1>
      <DataTable columns={columns} data={history} />
    </div>
  );
}
