import React from "react";
import ReactDOM from "react-dom/client";
import "@smastrom/react-rating/style.css";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { Toaster } from "react-hot-toast";
import {  HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </PersistGate>
      </Provider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </ThemeProvider>
  </React.StrictMode>
);
