import React, { useState } from "react";
import Spinner from "../components/Spinner";
import useFetch from "../services/useFetch";

export default function Products() {
  const [size, setSize] = useState("");
  const { data: products, loading, error } = useFetch(
    "products?category=shoes"
  );

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filterProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === Number(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>
      {size && <h2>{`Found: ${filterProducts.length} items`}</h2>}
      <section id="products">{filterProducts.map(renderProduct)}</section>
    </>
  );
}
