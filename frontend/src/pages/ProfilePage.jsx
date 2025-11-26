import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function ProfilePage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/profile/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const columns = [
    { key: "id", title: "ID" },
    { key: "item", title: "Товар" },
    { key: "quantity", title: "Количество" },
    { key: "date", title: "Дата" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>My profile</h1>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
