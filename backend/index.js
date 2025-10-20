import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Пример API
app.get("/api/test", async (req, res) => {
  const users = await prisma.user.findMany().catch((e) => {
    console.error(e);
    res.status(500).json({ error: "Database error" });
  });
  res.json(users);
});

app.listen(4000, () => {
  console.log("✅ Backend server is running on http://localhost:4000");
});
