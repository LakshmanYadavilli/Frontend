import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "../utils/store.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
