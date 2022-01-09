import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  const addToCart = (id, sku) => {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      return itemInCart
        ? items.map((i) =>
            i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...items, { id, sku, quantity: 1 }];
    });
  };

  const updateQuantity = (sku, quantity) => {
    setCart((items) => {
      return quantity === 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  };

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Details addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
