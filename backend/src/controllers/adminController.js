export const getAdminStats = async (req, res) => {
  res.json({
    users: 120,
    items: 45,
    sales: 180,
    message: "Admin statistics fetched successfully",
  });
};
