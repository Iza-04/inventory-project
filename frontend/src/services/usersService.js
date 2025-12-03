import axios from "axios";

const API = "http://localhost:4000/api/users"; // <- при необходимости поменяю хост/порт
const TOKEN = "mysecrettoken"; // при необходимости вынесу в .env

export async function getUsers() {
  const res = await axios.get(API, { headers: { Authorization: TOKEN } });
  // если бекенд возвращает { users: [...] } — обработала оба варианта
  return Array.isArray(res.data) ? res.data : res.data?.users ?? [];
}

export async function createUser(user) {
  const res = await axios.post(API, user, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
}

export async function deleteUser(id) {
  const res = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
}
