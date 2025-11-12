import express from "express";
import {
  getAllInventories,
  createInventory,
} from "../controllers/inventoriesController.js";

const router = express.Router();

router.get("/", getAllInventories);
router.post("/", createInventory);

export default router;
