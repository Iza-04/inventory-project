let inventories = [];

export const getInventories = (req, res) => {
  res.status(200).json({ inventories });
};

export const createInventory = (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity === undefined) {
    return res.status(400).json({ message: "Name and quantity are required" });
  }

  const newInventory = { id: inventories.length + 1, name, quantity };
  inventories.push(newInventory);

  res
    .status(201)
    .json({ message: "Inventory created", inventory: newInventory });
};
