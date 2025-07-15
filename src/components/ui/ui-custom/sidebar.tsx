"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiPuzzle,
  HiAcademicCap,
  HiUserGroup,
  HiDocumentText,
  HiChartBar,
  HiX,
  HiBookOpen,
} from "react-icons/hi";
import logo from "../../../assets/logo.png";

export const DrawerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="3xl:hidden text-white ml-4"
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
                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiAcademicCap className="h-5 w-5" />
                  <span>Cursos</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/Courses"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiPuzzle className="h-5 w-5" />
                  <span>Módulos</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/Classes"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiBookOpen className="h-5 w-5" />
                  <span>Aulas</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/provas"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiUserGroup className="h-5 w-5" />
                  <span>Provas</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/documentacao"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiDocumentText className="h-5 w-5" />
                  <span>Documentação</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/grafico"
                  className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg"
                >
                  <HiChartBar className="h-5 w-5" />
                  <span>Gráfico</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
