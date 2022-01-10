export default function cartReducer(state, action) {
  switch (action.type) {
    case "CLEAR_CART":
      return [];
    case "ADD_TO_CART": {
      const { id, sku } = action.payload;
      const itemInCart = state.find((i) => i.sku === sku);
      return itemInCart
        ? state.map((i) =>
            i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state, { id, sku, quantity: 1 }];
    }
    case "UPDATE_CART": {
      const { quantity, sku } = action.payload;
      return quantity === 0
        ? state.filter((i) => i.sku !== sku)
        : state.map((i) =>
            i.sku === action.payload.sku ? { ...i, quantity } : i
          );
    }
    default:
      return state;
  }
}
