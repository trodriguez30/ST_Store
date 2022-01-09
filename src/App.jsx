import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Products";
export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Products />
        </main>
      </div>
      <Footer />
    </>
  );
}
