import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../styles/table.css";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      // Если настроен Vite proxy, можно использовать "/api/inventories"
      // иначе прямой адрес: "http://localhost:5000/api/inventories"
      const res = await fetch("/api/inventories");
      const data = await res.json();
      // поддерживаем и массив, и { inventories: [...] }
      const arr = Array.isArray(data) ? data : data.inventories ?? [];
      setItems(arr);
    } catch (err) {
      console.error("load inventories error", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Название" },
    { key: "category", title: "Категория" },
    { key: "count", title: "Количество" },
  ];

  // данные для графика (по name)
  const chartData = items.map((it) => ({
    name: it.name,
    quantity: Number(it.count ?? it.quantity ?? 0),
  }));

  return (
    <div style={{ padding: 20 }}>
      <h1>Инвентарь</h1>

      {loading && <p>Загрузка...</p>}

      <div style={{ height: 320, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <DataTable columns={columns} data={items} />
    </div>
  );
}
