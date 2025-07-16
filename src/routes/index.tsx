import { Classes } from "@/pages/classes";
import { Courses } from "@/pages/courses";
import { Home } from "@/pages/home";
import { Modules } from "@/pages/modules";
import { Proofs } from "@/pages/proofs";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/aulas" element={<Classes />} />
        <Route path="/aulas" element={<Classes />} />
        <Route path="/modulos" element={<Modules />} />
        <Route path="/provas" element={<Proofs />} />
        <Route />
      </Routes>
    </>
  );
}
