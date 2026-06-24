import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>hello home page </h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
