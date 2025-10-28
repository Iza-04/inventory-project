import { createItem } from "../services/itemService.js";

export async function createItemController(req, res) {
  try {
    const { inventoryId, ...data } = req.body;
    const item = await createItem(inventoryId, data);
    res.status(201).json(item);
  } catch (error) {
    if (error.message.includes("unique")) {
      res.status(409).json({ message: "Duplicate custom ID" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
