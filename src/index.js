import React from "react";
import { createRoot } from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { store, persistor } from "redux/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} loading={<h1>Loading...</h1>} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
