import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Маршрут инвентаря
app.get("/api/inventories", (req, res) => {
  res.json([
    { id: 1, name: "Ноутбук", category: "Техника", count: 4 },
    { id: 2, name: "Стул", category: "Мебель", count: 12 },
  ]);
});

app.get("/api/users", (req, res) => {
  res.json({
    users: [
      { id: 1, name: "Admin", email: "admin@mail.com", role: "admin" },
      { id: 2, name: "User", email: "user@mail.com", role: "user" },
    ],
  });
});

app.get("/api/profile/history", (req, res) => {
  res.json({
    history: [
      { date: "2025-01-01", action: "Login", details: "Вход в систему" },
      { date: "2025-01-03", action: "Edit", details: "Изменил данные профиля" },
    ],
  });
});

// СЕРВЕР
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
