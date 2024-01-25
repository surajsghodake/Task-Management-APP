import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return children;
};

export default ProtectedRoute;
