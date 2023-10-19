import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../context/Store";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { state } = useContext(Store) ?? {};
  const userInfo = state?.userInfo;

  return userInfo && userInfo.role === "admin" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default AdminRoute;
