import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
import { Theme } from "@radix-ui/themes";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Theme>
      <App />
    </Theme>
  </Provider>
  //</React.StrictMode>
);
