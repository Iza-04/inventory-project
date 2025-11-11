import express from "express";
const router = express.Router();

// Простой тестовый эндпоинт
router.get("/", async (req, res) => {
  res.json({ message: "Inventories route is working 🚀" });
});

export default router;
