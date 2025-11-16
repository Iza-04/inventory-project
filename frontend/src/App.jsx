import React from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

import { Routes, Route } from "react-router-dom";
<Header />
<Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path="/inventory/:id/*" element={<InventoryPage/>} />
  <Route path="/admin" element={<AdminPage/>} />
  <Route path="/profile" element={<ProfilePage/>} />
</Routes>


export default function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}
