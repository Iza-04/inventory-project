import express from "express";
import inventoryRoutes from "./src/routes/inventories.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/inventories", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
