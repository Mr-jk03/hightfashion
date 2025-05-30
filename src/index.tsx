import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/hightfashion' : '/'}>
      <App />
    </BrowserRouter>
  </Provider>
);
