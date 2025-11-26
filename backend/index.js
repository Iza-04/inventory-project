import express from "express";
import inventoryRoutes from "./src/routes/inventories.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const app = express();
const PORT = 5000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running. Go to /api/inventories");
});
app.use("/api/inventories", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
