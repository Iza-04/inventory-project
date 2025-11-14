import express from "express";
const router = express.Router();

// Контроллеры
export const registerUser = async (req, res) => {
  res.status(201).json({ message: "User registered (stub)" });
};

export const loginUser = async (req, res) => {
  res.json({ token: "fake-jwt-token", message: "Login successful" });
};

export const getUserProfile = async (req, res) => {
  res.json({ id: 1, name: "John Doe", role: "admin" });
};

// Маршруты
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);

// Экспортирую router
export default router;
