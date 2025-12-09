import axios from "axios";

// если фронтенд проксирует /api -> BACKEND, можно оставить "/api/inventories"
// иначе полный адрес, например "http://localhost:4000/api/inventories"
const API = "http://localhost:5000/api/inventories";
const TOKEN = "mysecrettoken";

export async function getInventories() {
  const res = await axios.get(API, { headers: { Authorization: TOKEN } });
  // если backend возвращает { inventories: [...] } или массив
  return Array.isArray(res.data) ? res.data : res.data?.inventories ?? [];
}

export async function createInventory(item) {
  return (await axios.post(API, item, { headers: { Authorization: TOKEN } }))
    .data;
}
export async function deleteInventory(id) {
  return (
    await axios.delete(`${API}/${id}`, { headers: { Authorization: TOKEN } })
  ).data;
}
export async function updateInventory(id, item) {
  return (
    await axios.put(`${API}/${id}`, item, { headers: { Authorization: TOKEN } })
  ).data;
}
