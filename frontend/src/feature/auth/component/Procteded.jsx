import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Procteded = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loding = useSelector((state) => state.auth.Loading);
  const navigate = useNavigate();

  if (loding) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return navigate("/login");
  }

  return children;
};

export default Procteded;
