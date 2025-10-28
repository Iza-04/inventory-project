import express from "express";
import itemsRouter from "./routes/items.js";

const app = express();
app.use(express.json());

// Подключаем маршруты
app.use("/api/items", itemsRouter);

// health-check
app.get("/health", (req, res) => res.send("OK"));

app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on port", process.env.PORT || 4000)
);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
// const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// health
app.get("/health", (req, res) => res.json({ ok: true }));

// simple register/login (example)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/api/auth/register", async (req, res) => {
  const { email, password, name } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hash, name },
  });
  res.json({ id: user.id, email: user.email });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid" });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token });
});

// example create inventory
app.post("/api/inventories", async (req, res) => {
  const { title, description, category, tags } = req.body;
  // implement auth middleware to get user id (omitted here)
  const ownerId = req.body.ownerId || null; // replace with req.user.id
  const inv = await prisma.inventory.create({
    data: { title, description, category, ownerId, tags },
  });
  res.json(inv);
});

app.listen(PORT, () => console.log(`Backend listening ${PORT}`));
