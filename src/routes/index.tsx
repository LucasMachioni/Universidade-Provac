import { AuthProvider } from "@/contexts/auth-context";
import { Classes } from "@/pages/classes";
import { Courses } from "@/pages/courses";
import { Home } from "@/pages/home";
import { Modules } from "@/pages/modules";
import { Proofs } from "@/pages/proofs";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private-route";

export function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute />}>
          <Route path="/cursos" element={<Courses />} />
          <Route path="/aulas" element={<Classes />} />
          <Route path="/modulos" element={<Modules />} />
          <Route path="/provas" element={<Proofs />} />
        </Route>
        <Route />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
