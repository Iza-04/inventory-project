import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  createInventory,
  getInventories,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", authenticate, getInventories);
router.post("/", authenticate, createInventory);

export default router;
