import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Demo route
app.post("/api/items", async (req, res) => {
  const { inventoryId, name, price } = req.body;

  try {
    const item = await prisma.item.create({
      data: {
        inventoryId,
        name,
        price,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
