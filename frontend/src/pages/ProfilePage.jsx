import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import axios from "axios";
import "../styles/table.css";

export default function ProfilePage() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/profile/history")
      .then((res) => {
        const data = res.data?.history ?? res.data ?? [];
        setHistory(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.warn("History not available:", err);
        setError("История недоступна на сервере");
        setHistory([]);
      });
  }, []);

  const columns = [
    { key: "date", title: "Дата" },
    { key: "action", title: "Действие" },
    { key: "details", title: "Описание" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Профиль</h1>
      {error && <p style={{ color: "orange" }}>{error}</p>}
      <DataTable columns={columns} data={history} />
    </div>
  );
}
