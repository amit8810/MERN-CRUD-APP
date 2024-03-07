import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import SingleProduct from "./components/SingleProduct.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/product/:id" element={<SingleProduct/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
