import logo from "./logo.svg";
import "./App.css";
import React from "react";
import App from "./App";
import { App2 } from "./App";
import DndExample from "./components/DndExample";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-4">
      <h2>Course project</h2>
      <DndExample />
    </div>
  );
}

function App2() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

export { App2 };
