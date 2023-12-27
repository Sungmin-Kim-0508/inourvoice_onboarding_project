import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./css/global.css";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("@repo/mock");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
