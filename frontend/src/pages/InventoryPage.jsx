import { useEffect, useState } from "react";
import {
  getInventories,
  createInventory,
  deleteInventory,
  updateInventory,
} from "../services/inventoryService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getInventories();
      setItems(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load inventories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  const onAdd = async (e) => {
    e.preventDefault();
    if (!name) return setMessage("Enter name");
    setLoading(true);
    try {
      await createInventory({ name, quantity });
      setName("");
      setQuantity(1);
      setMessage("Item created");
      await load();
    } catch {
      setMessage("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    setLoading(true);
    try {
      await deleteInventory(id);
      setMessage("Item deleted");
      await load();
    } catch {
      setMessage("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (id) => {
    const newName = prompt("New name:");
    const newQuantity = Number(prompt("New quantity:"));
    if (!newName || !newQuantity) return;
    setLoading(true);
    try {
      await updateInventory(id, { name: newName, quantity: newQuantity });
      setMessage("Item updated");
      await load();
    } catch {
      setMessage("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Inventory</h3>

      {/* Форма создания */}
      <form onSubmit={onAdd} style={{ marginBottom: 16 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          style={{ width: 80, marginLeft: 8 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Add
        </button>
      </form>

      {/* Сообщения */}
      {message && <div style={{ marginBottom: 16 }}>{message}</div>}

      {/* График */}
      <LineChart width={600} height={300} data={items}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
      </LineChart>

      {/* Таблица */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="5" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>{it.quantity}</td>
                <td>
                  <button onClick={() => onUpdate(it.id)}>Edit</button>
                  <button
                    onClick={() => onDelete(it.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Пагинация */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Back
        </button>
        <button onClick={() => setPage((p) => p + 1)} style={{ marginLeft: 8 }}>
          Next
        </button>
      </div>
    </div>
  );
}
