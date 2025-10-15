import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";            // предполагаем, что src/App.jsx или src/App.js существует
import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
