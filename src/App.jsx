import React, { useReducer, useEffect } from "react";

import "./App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";

import { Routes, Route } from "react-router-dom";

import cartReducer from "./reducers/cartReducer";

let initialCartState;

try {
  initialCartState = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  initialCartState = [];
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

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
              element={<Details dispatch={dispatch} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatch={dispatch} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatch={dispatch} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
