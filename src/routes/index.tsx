import { Classes } from "@/pages/classes";
import { Courses } from "@/pages/create-courses";
import { Login } from "@/pages/login";
import { Modules } from "@/pages/modules";
import { Proofs } from "@/pages/proofs";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private-route";
import { CoursesList } from "@/pages/courses";
import { Register } from "@/pages/register";

export function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/cadastrar-curso" element={<Courses />} />
          <Route path="/cursos" element={<CoursesList />} />
          <Route path="/aulas" element={<Classes />} />
          <Route path="/modulos" element={<Modules />} />
          <Route path="/provas" element={<Proofs />} />
          <Route path="/registrar" element={<Register />} />
        </Route>
        <Route />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}
