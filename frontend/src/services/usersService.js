import axios from "axios";
const API = "http://localhost:5000/api/users";
const TOKEN = "mysecrettoken";

export async function getUsers() {
  const res = await axios.get(API, { headers: { Authorization: TOKEN } });
  return Array.isArray(res.data) ? res.data : res.data?.users ?? [];
}
export async function createUser(user) {
  return (await axios.post(API, user, { headers: { Authorization: TOKEN } }))
    .data;
}
export async function deleteUser(id) {
  return (
    await axios.delete(`${API}/${id}`, { headers: { Authorization: TOKEN } })
  ).data;
}
