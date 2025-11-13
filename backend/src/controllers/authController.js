export const login = async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ message: "Login successful", token: "fake-jwt-token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export const register = async (req, res) => {
  const { username } = req.body;
  res.status(201).json({ message: `User ${username} registered successfully` });
};
