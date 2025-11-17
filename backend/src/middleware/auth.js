export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || token !== "mysecrettoken") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
