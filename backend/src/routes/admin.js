import express from "express";
const router = express.Router();

// Примеры контроллеров (заглушки)
export const getAllUsers = async (req, res) => {
  res.json([
    { id: "1", name: "John Doe", role: "admin" },
    { id: "2", name: "Jane Smith", role: "user" },
  ]);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted (stub)` });
};

export const toggleAdminAccess = async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Toggled admin access for user ${id} (stub)` });
};

// Маршруты
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/toggle-admin", toggleAdminAccess);

export default router;
