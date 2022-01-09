const baseUrl = "https://28dxn.sse.codesandbox.io";

const requestDictionary = {
  products: {
    byCategory: (category) => `${baseUrl}/products?category=${category}`,
    detailsById: (id) => `${baseUrl}/products/${id}`
  },
  shipping: {
    saveAddress: `${baseUrl}/shippingAddress`,
    getAddress: (userId) => `${baseUrl}/shippingAddress/${userId}`
  }
};

export default requestDictionary;
