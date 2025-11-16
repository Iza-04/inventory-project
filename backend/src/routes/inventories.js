import express from "express";
import {
  getAllInventories,
  createInventory,
} from "../controllers/inventoriesController.js";

const router = express.Router();

router.get("/", getAllInventories); // supports ?q=, ?page=, ?limit=
router.post("/", authenticate, createInventory);
router.get("/:id", getInventoryById);
router.put("/:id", authenticate, authorizeOwnerOrAdmin, updateInventory);
router.delete("/:id", authenticate, authorizeOwnerOrAdmin, deleteInventory);
router.get("/:id/items", getItemsForInventory); // pagination+filter
router.post("/:id/items", authenticate, authorizeWriteAccess, createItem);

export default router;
