import ReactDOM from "react-dom";

import App from "./App";
import ErrorBoundary from "./pages/ErrorBoundary";

import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>,
  rootElement
);
