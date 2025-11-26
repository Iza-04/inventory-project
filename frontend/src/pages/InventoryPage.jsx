import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function InventoryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/inventories")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Название" },
    { key: "category", title: "Категория" },
    { key: "count", title: "Количество" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory</h1>
      <DataTable columns={columns} data={items} />
    </div>
  );
}
