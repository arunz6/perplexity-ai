import { Navigate } from "react-router-dom"; // ← import karo
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />; // ✅ Uppercase N
  }

  return children;
};

export default Protected;
