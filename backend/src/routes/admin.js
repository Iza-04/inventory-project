export const getAllUsers = async (req, res) => {
  res.json([
    { id: 1, name: "John Doe", role: "admin" },
    { id: 2, name: "Jane Smith", role: "user" },
  ]);
};

export const deleteUser = async (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
};

export const toggleAdminAccess = async (req, res) => {
  res.json({ message: `Admin rights toggled for user ${req.params.id}` });
};
