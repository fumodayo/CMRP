import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../context/Store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useContext(Store) ?? {};
  const userInfo = state?.userInfo;

  return userInfo && userInfo.role.includes("user") ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
