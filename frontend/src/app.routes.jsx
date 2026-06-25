import { createBrowserRouter,  } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Procteded from "./feature/auth/component/Procteded";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <Procteded>
        <div>Home Page</div>
      </Procteded>
    ,
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
