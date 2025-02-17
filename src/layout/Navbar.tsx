import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/image/logo-no-bg.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-50 px-8 w-full h-14 flex justify-between items-center bg-white shadow-md lg:rounded-full lg:mt-4">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="SeviGo"
            className="h-20 w-20 mr-2 rounded-full"
          />
          <span className="text-3xl font-bold text-gray-900">SeviGo</span>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-md">
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Fitur
          </a>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Informasi
          </a>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            FAQ
          </a>
          <Link to={"/register"}>
            <a href="#" className="text-gray-900 hover:text-orange-500">
              Register
            </a>
          </Link>
          <Link to="/login">
            <button className="bg-orange-500 font-bold text-lg text-slate-100 px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-slate-50 duration-700">
              Login
            </button>
          </Link>
        </div>

        <div className="md:hidden">
          <button
            className="text-gray-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"} text-2xl`}></i>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } bg-white shadow-md py-4 px-8 flex flex-col space-y-4`}
        style={{
          position: "fixed",
          top: "56px",
          left: "0",
          right: "0",
          zIndex: 100,
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <a href="#" className="text-gray-900 hover:text-orange-500">
          Fitur
        </a>
        <a href="#" className="text-gray-900 hover:text-orange-500">
          Informasi
        </a>
        <a href="#" className="text-gray-900 hover:text-orange-500">
          FAQ
        </a>
        <Link to={"/register"}>
          <a href="#" className="text-gray-900 hover:text-orange-500">
            Register
          </a>
        </Link>
        <Link to="/login">
          <button className="bg-orange-500 font-bold text-lg text-slate-100 w-full px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-slate-50 duration-700">
            Login
          </button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
