import requestDictionary from "./requestDictionary";

export async function saveShippingAddress(address) {
  return fetch(requestDictionary.shipping.saveAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(address)
  });
}
