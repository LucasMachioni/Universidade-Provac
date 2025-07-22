import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { AppRoutes } from "./routes";
import { NavBar } from "./components/ui/ui-custom/navbar";

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-white p-4">Carregando...</div>;
  }

  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export function App() {
  return (
    <div className="bg-[#10151F]">
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
