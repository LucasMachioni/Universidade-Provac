import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export function PrivateRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
