export const getAllInventories = async (req, res) => {
  res.json([
    {
      id: 1,
      title: "Office Equipment",
      description: "Laptops, monitors, printers",
    },
  ]);
};

export const createInventory = async (req, res) => {
  const { title, description } = req.body;
  res
    .status(201)
    .json({ message: "Inventory created", data: { title, description } });
};
