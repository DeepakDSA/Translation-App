import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HistoryProvider } from "./HistoryContext";
import "./index.css";

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </React.StrictMode>
);