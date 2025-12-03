import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import "../styles/table.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      // backend может вернуть массив или { users: [...] }
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.users ?? res.data ?? [];
      setUsers(data);
    } catch (err) {
      console.error("Ошибка загрузки пользователей:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
    } catch (err) {
      console.error("Ошибка удаления пользователя:", err);
      alert("Не удалось удалить пользователя (см. консоль).");
    }
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Имя" },
    { key: "email", title: "Email" },
    { key: "role", title: "Роль" },
    // кнопка удаление будет показана через DataTable? Если нет, ниже подсказка
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Админ-панель</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <DataTable columns={columns} data={users} />
      )}
      <p style={{ marginTop: 10 }}>
        Для удаления используйте API (метод DELETE /api/users/:id). Код удаления
        в консоли.
      </p>
    </div>
  );
}
