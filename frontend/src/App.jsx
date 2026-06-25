import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import { useauth } from "./feature/auth/hook/useauth.js";
import { useEffect } from "react";

function App() {
  const auth = useauth();

  useEffect(() => {
    auth.getmeuser();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
