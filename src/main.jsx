import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";

// Route transitions and the intro own scroll placement; browser restoration
// otherwise races the initial hero/film layout after a reload.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
