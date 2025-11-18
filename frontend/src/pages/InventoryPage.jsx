import { useEffect, useState } from "react";
import { getInventories, createInventory } from "../services/inventoryService";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  }, []);

  const onAdd = async (e) => {
    e.preventDefault();
    if (!name) return setMessage("Enter name");
    try {
      await createInventory({ name, quantity });
      setName("");
      setQuantity(1);
      setMessage("Created");
      await load();
    } catch (err) {
      console.error(err);
      setMessage("Create failed");
    }
  };

  return (
    <div>
      <h3>Inventory</h3>

      <form onSubmit={onAdd} style={{ marginTop: 8 }}>
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
          style={{ width: 90 }}
        />
        <button className="btn btn-primary">Add</button>
      </form>

      {message && <div className="message">{message}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{it.name}</td>
                <td>{it.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
