import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // Redirigir si no está autenticado
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" />; // Redirigir si no tiene permiso

  return <Outlet />;
};

export default PrivateRoute;
