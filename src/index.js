import ReactDOM from "react-dom";

import App from "./App";
import ErrorBoundary from "./pages/ErrorBoundary";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cartContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </ErrorBoundary>,
  rootElement
);
