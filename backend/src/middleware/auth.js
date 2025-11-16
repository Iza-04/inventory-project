import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: "No token" });
  const token = h.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // {id, email, role}
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
  }
};
