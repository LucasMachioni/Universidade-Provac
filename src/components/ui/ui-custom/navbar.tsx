"use client";

import logo from "../../../assets/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { DrawerSidebar } from "./sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

export const NavBar = () => {
  const { token, isManager, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <div className="text-white p-4">Carregando...</div>;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full bg-[#222325] h-24 px-6 flex items-center sticky top-0 z-50">
      {token && isManager ? <DrawerSidebar key={`sidebar-${token}`} /> : null}

      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-24 md:h-24" />
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Universidade Provac
        </h1>
      </div>

      <ul className="hidden xl:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-8 text-white text-md">
        <li className="hover:text-gray-300 cursor-pointer font-bold">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer font-bold">
          <Link to="/cursos">Cursos</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer font-bold">
          <Link to="/sobre">Sobre</Link>
        </li>
        <li className="hover:text-gray-300 cursor-pointer font-bold">
          <Link to="/gestor">Área Gestor</Link>
        </li>
      </ul>

      <div className="ml-auto">
        <ul className="flex gap-6 text-white items-center">
          {!token && (
            <li className="hover:text-gray-300 cursor-pointer font-bold flex gap-1.5">
              <LoginIcon />
              <Link to="/">Login</Link>
            </li>
          )}

          {token && (
            <li
              onClick={handleLogout}
              className="hover:text-gray-300 cursor-pointer font-bold flex gap-1.5"
            >
              <LogoutIcon />
              <span>Logout</span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
