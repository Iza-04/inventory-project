export const getAllItems = async (req, res) => {
  res.json([
    { id: "ITM001", name: "Laptop", price: 1200 },
    { id: "ITM002", name: "Monitor", price: 300 },
  ]);
};

export const createItem = async (req, res) => {
  const { name, price } = req.body;
  res.status(201).json({ message: "Item added", data: { name, price } });
};
