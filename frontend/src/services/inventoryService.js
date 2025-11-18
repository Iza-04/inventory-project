import axios from "axios";

const API = "/api/inventories";
const TOKEN = "mysecrettoken";

export async function getInventories() {
  const res = await axios.get(API, { headers: { Authorization: TOKEN } });
  return res.data.inventories || [];
}

export async function createInventory(item) {
  const res = await axios.post(API, item, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
}

export async function deleteInventory(id) {
  // если later добавить реализацию на backend
  return null;
}
