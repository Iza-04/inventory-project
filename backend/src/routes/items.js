import express from "express";
import { createItemController } from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItemController);

export default router;
