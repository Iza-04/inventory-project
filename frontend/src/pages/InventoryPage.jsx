import React, { useEffect, useState, useMemo } from "react";
import DataTable from "../components/DataTable";
import { getInventories } from "../services/inventoryService";
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
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [searchId, setSearchId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [sortKey, setSortKey] = useState("id");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    setLoading(true);
    setError(null);

    getInventories()
      .then((res) => {
        let data = Array.isArray(res) ? res : res?.inventories ?? [];

        if (!data || data.length === 0) {
          data = [
            { id: 1, name: "Пример 1", quantity: 10 },
            { id: 2, name: "Пример 2", quantity: 30 },
            { id: 3, name: "Пример 3", quantity: 20 },
          ];
        }

        setItems(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить данные");
        setItems([
          { id: 1, name: "Пример 1", quantity: 10 },
          { id: 2, name: "Пример 2", quantity: 30 },
          { id: 3, name: "Пример 3", quantity: 20 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let data = [...items];
    if (search.trim()) {
      data = data.filter((i) =>
        i.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (searchId.trim()) {
      data = data.filter((i) => String(i.id) === searchId.trim());
    }
    data.sort((a, b) => {
      const v1 = a[sortKey];
      const v2 = b[sortKey];
      if (v1 < v2) return sortDir === "asc" ? -1 : 1;
      if (v1 > v2) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [items, search, searchId, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const chartData = items.map((it) => ({
    name: it.name ?? `#${it.id}`,
    quantity: Number(it.quantity ?? 0),
  }));

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Название" },
    { key: "quantity", title: "Количество" },
  ];

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Инвентарь</h1>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        className="filters"
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          placeholder="Поиск по ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div style={{ width: "100%", height: 320, marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="quantity"
              stroke="#2b85ff"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <DataTable
        columns={columns.map((c) => ({
          ...c,
          onClick: () => toggleSort(c.key),
          sortable: true,
        }))}
        data={paginated}
      />

      <div
        className="pagination"
        style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}
      >
        <button type="button" onClick={() => setPage(1)} disabled={page === 1}>
          ≪
        </button>
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ‹
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          ›
        </button>
        <button
          type="button"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          ≫
        </button>
      </div>
    </div>
  );
}
