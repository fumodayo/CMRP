import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../context/Store";

interface InstructorRouteProps {
  children: React.ReactNode;
}

const InstructorRoute: React.FC<InstructorRouteProps> = ({ children }) => {
  const { state } = useContext(Store) ?? {};
  const userInfo = state?.userInfo;

  return userInfo && userInfo.role === "instructor" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default InstructorRoute;
