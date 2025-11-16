const API_BASE = "http://localhost:4000";

// useAutoSave(state, saveFn, deps)
useEffect(() => {
  if (!changed) return;
  const t = setTimeout(() => saveFn(state), 8000);
  return () => clearTimeout(t);
}, [state, ...deps]);

export async function getInventories() {
  const res = await fetch(`${API_BASE}/api/inventories`);
  if (!res.ok) throw new Error("Failed to fetch inventories");
  return res.json();
}

export async function getItems(inventoryId) {
  const res = await fetch(`${API_BASE}/api/inventories/${inventoryId}/items`);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}
