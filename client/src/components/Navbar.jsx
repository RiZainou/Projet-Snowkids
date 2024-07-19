/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/S (1).png";

export default function Navbar({ currentUser, setCurrentUser }) {
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuToggle(!menuToggle);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3310/api/auth/logout", {
        withCredentials: true,
      });

      setCurrentUser(null);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav className="font-sans flex items-center justify-between py-4 px-6 bg-red-700 shadow w-full">
      <div className="text-white text-lg">
        <Link to="/">
          <img src={logo} alt="logo" className="rounded-full border w-20" />
        </Link>
      </div>
      <div className="sm:hidden">
        <button
          type="button"
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuToggle ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            >
              Chemin
            </path>
          </svg>
        </button>
      </div>
      <div
        className={`sm:flex ${menuToggle ? "block" : "hidden"} sm:w-auto justify-end`}
      >
        <ul className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 mt-4 sm:mt-0">
          <li className="text-lg text-white">
            <Link to="/">Accueil</Link>
          </li>
          <li className="text-lg text-white">
            <Link to="/equipes">Equipes</Link>
          </li>
          <li className="text-lg text-white">
            <Link to="/contact">Contact</Link>
          </li>
          {currentUser ? (
            <li className="text-lg text-white">
              <button
                type="button"
                onClick={handleLogout}
                className="focus:outline-none"
              >
                Se déconnecter
              </button>
            </li>
          ) : (
            <li className="text-lg text-white">
              <Link to="/login">Se connecter</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
