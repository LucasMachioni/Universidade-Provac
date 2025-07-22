import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  login: (tok: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  // Ao montar, reidrata do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("APP_TOKEN");
    if (saved) setToken(saved);
  }, []);

  const login = (tok: string) => {
    localStorage.setItem("APP_TOKEN", tok);
    setToken(tok);
  };

  const logout = () => {
    localStorage.removeItem("APP_TOKEN");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve estar dentro de AuthProvider");
  return ctx;
}
