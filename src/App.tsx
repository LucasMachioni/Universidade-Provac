import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { NavBar } from "./components/ui/ui-custom/navbar";

export function App() {
  return (
    <div className="bg-[#10151F]">
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}
