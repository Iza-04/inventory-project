import express from "express";
import { getAllItems, createItem } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/", createItem);

export default router;
