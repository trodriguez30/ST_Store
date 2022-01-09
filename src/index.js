import ReactDOM from "react-dom";

import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  rootElement
);
