import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let isAuthenticated = !!localStorage.getItem("authToken");
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
