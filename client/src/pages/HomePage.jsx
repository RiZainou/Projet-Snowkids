import { Link } from "react-router-dom";
import snowkids from "../assets/images/Image equipe Galactik Football.png";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-center text-3xl mt-8 font-black">SnowKids</h1>
      <div className="flex justify-center mt-5">
        <img src={snowkids} alt="equipe snowkids" className="w-1/3" />
      </div>
      <div className="border-2 border-blue-500 rounded-lg shadow-lg lg:mx-80 mt-5 p-5">
        <h2 className="text-center text-2xl mt-4 font-black text-gray-900">
          Qui sommes nous ?
        </h2>
        <p className="pt-4 text-center text-gray-700">
          Nous sommes une équipe de football extraterrestre originaire de la
          planète de glace Akillian. On est connus pour notre style de jeu
          innovant et notre esprit d'équipe exceptionnel. Notre principale
          mission est de remporter le championnat de Glaktik Football et de
          sauver notre planète de la menace des forces obscures.
        </p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
          >
            <Link to="/a-propos"> En savoir Plus</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
