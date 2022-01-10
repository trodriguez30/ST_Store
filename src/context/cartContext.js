import React, { useEffect, useReducer, createContext, useContext } from "react";
import cartReducer from "../reducers/cartReducer";

const cartContext = createContext(null);

let initialCartState;

try {
  initialCartState = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  initialCartState = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    <cartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </cartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error(
      "UseCartContext must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error."
    );
  }
  return context;
}
