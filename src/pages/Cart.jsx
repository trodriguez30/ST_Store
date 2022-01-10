import React, { useMemo } from "react";
import requestDictionary from "../services/requestDictionary";
import useFetchAll from "../hooks/useFetchAll";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, dispatch }) {
  const navigate = useNavigate();
  const urls = cart.map((i) => requestDictionary.products.detailsById(i.id));
  const { data: products, loading, error } = useFetchAll(urls);

  const updateQuantity = (e, sku) => {
    const quantity = Number(e.target.value);
    dispatch({
      type: "UPDATE_CART",
      payload: {
        quantity,
        sku
      }
    });
  };

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === Number(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => updateQuantity(e, sku)}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  const numItemsInCart = useMemo(
    () => cart.reduce((acum, item) => acum + item.quantity, 0),
    [cart]
  );

  if (loading) return <Spinner />;
  if (error) throw error;

  return (
    <section id="cart">
      <h1>
        {numItemsInCart > 0
          ? `${numItemsInCart} items added`
          : "No items added"}
      </h1>
      <ul>{cart.map(renderItem)}</ul>
      {numItemsInCart > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
