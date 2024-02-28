import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./container/styles/main.css";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5818/express-css",
  withCredentials: "include",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
