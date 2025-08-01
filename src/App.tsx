import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { AppRoutes } from "./routes";
import { NavBar } from "./components/ui/ui-custom/navbar";
import { useLocation } from "react-router-dom";

function AppContent() {
  const { isLoading, token } = useAuth();
  const location = useLocation();

  const hideNavbar = ["/"];

  if (isLoading) {
    return <div className="text-white p-4">Carregando...</div>;
  }

  return (
    <>
      {!hideNavbar.includes(location.pathname) && (
        <NavBar key={token ?? "no-token"} />
      )}
      <AppRoutes />
    </>
  );
}

export function App() {
  return (
    <AuthProvider>
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}
