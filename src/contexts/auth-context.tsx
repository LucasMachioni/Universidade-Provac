import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

interface Role {
  authority: string;
}

interface AuthContextType {
  token: string | null;
  isManager: boolean;
  isLoading: boolean;
  login: (tok: string, roles: Role[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("APP_TOKEN");
    const savedRoles = localStorage.getItem("APP_ROLES");

    if (savedToken && savedRoles) {
      setToken(savedToken);

      try {
        const rolesArr: Role[] = JSON.parse(savedRoles);
        const manager = rolesArr.some((r) => r.authority === "ROLE_MANAGER");
        setIsManager(manager);
      } catch (error) {
        console.error("Erro ao parsear roles do localStorage", error);
        setIsManager(false);
      }
    }

    setIsLoading(false);
  }, []);

  const login = (tok: string, roles: Role[]) => {
    localStorage.setItem("APP_TOKEN", tok);
    localStorage.setItem("APP_ROLES", JSON.stringify(roles));
    setToken(tok);
    setIsManager(roles.some((r) => r.authority === "ROLE_MANAGER"));
  };

  const logout = () => {
    localStorage.removeItem("APP_TOKEN");
    localStorage.removeItem("APP_ROLES");
    setToken(null);
    setIsManager(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, isManager, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve estar dentro de AuthProvider");
  return ctx;
}
