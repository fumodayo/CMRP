import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../context/Store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useContext(Store) ?? {};
  console.log("state", state);
  const userInfo = state?.userInfo;
  console.log("userInfo", userInfo);

  return userInfo && userInfo.role === "user" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
