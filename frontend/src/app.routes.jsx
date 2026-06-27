import { createBrowserRouter } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Procteded from "./feature/auth/component/Procteded";
import Dashbord from "./feature/chat/page/Dashbord";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Procteded>
        <Dashbord />
      </Procteded>
    ),
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
