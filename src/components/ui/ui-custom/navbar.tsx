import logo from "../../../assets/logo.png";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

export const NavBar = () => {
  return (
    <nav className="w-full bg-[#222325] h-24 px-6 flex items-center relative">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-24 md:h-24" />
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Universidade Provac
        </h1>
      </div>

      <ul className="hidden xl:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-8 text-white text-md">
        <li className="hover:text-gray-300 cursor-pointer font-bold">Home</li>
        <li className="hover:text-gray-300 cursor-pointer font-bold"> <a href="/Courses">Cursos</a></li>
        <li className="hover:text-gray-300 cursor-pointer font-bold">Sobre</li>
        <li className="hover:text-gray-300 cursor-pointer font-bold">
          Área Gestor
        </li>
      </ul>

      <div className="ml-auto">
        <ul className="flex gap-6 text-white">
          <li className="hover:text-gray-300 cursor-pointer font-bold flex gap-1.5">
            <LoginIcon />
            Login
          </li>
          <li className="hover:text-gray-300 cursor-pointer font-bold flex gap-1.5">
            <PersonIcon />
            Perfil
          </li>
        </ul>
      </div>
    </nav>
  );
};
