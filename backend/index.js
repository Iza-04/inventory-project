import express from "express";
import inventoriesRouter from "./src/routes/inventories.js";
import itemsRouter from "./src/routes/items.js";
import authRouter from "./src/routes/auth.js";
import adminRouter from "./src/routes/admin.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/inventories", inventoriesRouter);
app.use("/api/items", itemsRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
