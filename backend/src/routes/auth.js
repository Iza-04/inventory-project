import express from "express";
const router = express.Router();

export const registerUser = async (req, res) => {
  res.status(201).json({ message: "User registered (stub)" });
};

export const loginUser = async (req, res) => {
  res.json({ token: "fake-jwt-token", message: "Login successful" });
};

export const getUserProfile = async (req, res) => {
  res.json({ id: 1, name: "John Doe", role: "admin" });
};

export default router;
