import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import PageNotFound from "./PageNotFound";
import requestDictionary from "../services/requestDictionary";

export default function Details({ dispatch }) {
  const [sku, setSku] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(
    requestDictionary.products.detailsById(id)
  );

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  const sizeOptions = ({ sku, size }) => {
    return (
      <option key={sku} value={sku}>
        {size}
      </option>
    );
  };

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map(sizeOptions)}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: "ADD_TO_CART", payload: { id, sku } });
            navigate("/cart");
          }}
          disabled={!sku}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
