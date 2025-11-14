export const getAllUsers = async (req, res) => {
  res.json([
    { id: 1, name: "Iza M", role: "admin" },
    { id: 2, name: "Iza M", role: "user" },
  ]);
};

export const deleteUser = async (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
};

export const toggleAdminAccess = async (req, res) => {
  res.json({ message: `Admin rights toggled for user ${req.params.id}` });
};

export default router;
