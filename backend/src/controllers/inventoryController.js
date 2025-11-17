import { pool } from "../db.js";

// Получение всех инвентарей
export const getInventories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventories ORDER BY id");
    res.status(200).json({ inventories: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Создание нового инвентаря
export const createInventory = async (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity === undefined) {
    return res.status(400).json({ message: "Name and quantity are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO inventories (name, quantity) VALUES ($1, $2) RETURNING *",
      [name, quantity]
    );
    res
      .status(201)
      .json({ message: "Inventory created", inventory: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
