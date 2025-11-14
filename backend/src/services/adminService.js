import axios from "axios";

const API = "http://localhost:4000/api/admin";

// Получение списка пользователей
export const getUsers = async () => {
  const res = await axios.get(`${API}/users`);
  return res.data;
};

// Удаление пользователя
export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/users/${id}`);
  return res.data;
};

// Toggle admin state (включить/выключить admin)
export const toggleAdmin = async (id) => {
  const res = await axios.patch(`${API}/users/${id}/toggle-admin`);
  return res.data;
};
