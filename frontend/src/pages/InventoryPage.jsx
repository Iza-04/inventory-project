import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { getInventories } from "../api";

export default function HomePage() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    getInventories().then(setInventories).catch(console.error);
  }, []);

  return (
    <Container className="mt-4">
      <h2>📦 Inventories</h2>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.title}</td>
              <td>{inv.description}</td>
              <td>{inv.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
