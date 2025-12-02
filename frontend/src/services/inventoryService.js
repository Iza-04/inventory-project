import axios from "axios";

const API = "http://localhost:4000/api/inventories";
const TOKEN = "mysecrettoken";

export async function getInventories() {
  const res = await axios.get(API, {
    headers: { Authorization: TOKEN },
  });
  return res.data.inventories || [];
}

export async function createInventory(item) {
  const res = await axios.post(API, item, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
}

export async function deleteInventory(id) {
  const res = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
}

export async function updateInventory(id, item) {
  const res = await axios.put(`${API}/${id}`, item, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
}
