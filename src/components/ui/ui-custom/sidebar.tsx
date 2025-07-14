"use client";

import { useState } from "react";
import {
  HiHome,
  HiAcademicCap,
  HiInformationCircle,
  HiUserGroup,
  HiChevronDown,
  HiX,
} from "react-icons/hi";
import logo from "../../../assets/logo.png";

export const DrawerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <>
      <button
        className="x2:hidden text-white ml-4"
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-50 flex ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-[#00000095] transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`relative bg-[#222325] w-64 h-full text-white z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-10" />
              <span className="font-bold">Universidade Provac</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <HiX className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-5">
            <ul className="space-y-1 px-2">
              <li>
                <a
                  href="/"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiHome className="h-5 w-5" />
                  <span>Aulas</span>
                </a>
              </li>

              <li>
                <a
                  href="/Courses"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiAcademicCap className="h-5 w-5" />
                  <span>Cursos</span>
                </a>
              </li>

              <li>
                <button
                  className="flex items-center justify-between w-full p-3 hover:bg-gray-700 rounded-lg"
                  onClick={() => toggleSubmenu("sobre")}
                >
                  <div className="flex items-center gap-3">
                    <HiInformationCircle className="h-5 w-5" />
                    <span>Módulos</span>
                  </div>
                  <HiChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openSubmenu === "sobre" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubmenu === "sobre" && (
                  <ul className="ml-8 mt-1 space-y-1">
                    <li>
                      <a
                        href="/sobre/historia"
                        className="block p-2 hover:bg-gray-700 rounded"
                      >
                        Nossa História
                      </a>
                    </li>
                    <li>
                      <a
                        href="/sobre/equipe"
                        className="block p-2 hover:bg-gray-700 rounded"
                      >
                        Equipe
                      </a>
                    </li>
                    <li>
                      <a
                        href="/sobre/contato"
                        className="block p-2 hover:bg-gray-700 rounded"
                      >
                        Contato
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  className="flex items-center justify-between w-full p-3 hover:bg-gray-700 rounded-lg"
                  onClick={() => toggleSubmenu("gestor")}
                >
                  <div className="flex items-center gap-3">
                    <HiUserGroup className="h-5 w-5" />
                    <span>Área Gestor</span>
                  </div>
                  <HiChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openSubmenu === "gestor" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSubmenu === "gestor" && (
                  <ul className="ml-8 mt-1 space-y-1">
                    <li>
                      <a
                        href="/gestor/dashboard"
                        className="block p-2 hover:bg-gray-700 rounded"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/gestor/alunos"
                        className="block p-2 hover:bg-gray-700 rounded"
                      >
                        Gerenciar Alunos
                      </a>
                    </li>
                    <li>
                      <a
                        href="/gestor/financeiro"
                        className="block p-2 hover:bg-gray-700 rounded"
                      >
                        Financeiro
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
