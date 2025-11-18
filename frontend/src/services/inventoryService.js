import axios from "axios";

const API = "/api/inventories";
const TOKEN = "mysecrettoken";

export const getInventories = async () => {
  const res = await axios.get(API, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
};

export const createInventory = async (item) => {
  const res = await axios.post(API, item, {
    headers: { Authorization: TOKEN },
  });
  return res.data;
};
