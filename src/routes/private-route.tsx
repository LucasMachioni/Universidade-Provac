import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export function PrivateRoute() {
  const { token } = useAuth();

  // Se não houver token, manda pro /login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se houver, renderiza as rotas-filhas
  return <Outlet />;
}
