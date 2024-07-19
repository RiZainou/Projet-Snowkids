/* eslint-disable react/jsx-props-no-spreading */

import axios from "axios";
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate } from "react-router-dom"; // Importez useNavigate depuis react-router-dom

export default function LoginPage() {
  const { setCurrentUser } = useOutletContext();
  const navigate = useNavigate(); // Obtenez la fonction navigate

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(response.data.user);
      navigate("/"); // Redirigez vers la page home après la connexion réussie
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <main className="flex flex-col justify-center">
      <div>
        <form
          className="flex items-center flex-col my-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-sm font-bold" htmlFor="email">
            <p className="text-black ">E-mail</p>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="rounded-lg p-1  bg-white border border-gray-500"
              {...register("email", {
                required: "Votre email est obligatoire!",
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Le format de votre email est incorrect !",
                },
              })}
            />
          </label>
          <label className="text-sm font-bold">
            <p className="text-black" htmlFor="password">
              Mot de passe :
            </p>
            <input
              type="password"
              name="password"
              className="rounded-lg p-1  bg-white border border-gray-500"
              {...register("password", {
                required: "le mot de passe est requis!",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                  message: "Le format de votre mot de passe est incorrect !",
                },
              })}
            />
          </label>

          <div className="border-solid border-GreyComp">
            <button
              type="submit"
              className="text-black bg-GreenComp p-2 rounded-lg border-solid border-GreyComp mb-16 bg-red-400 mt-4 ml-28"
            >
              Connexion
            </button>
            <p className="text-black my-12 text-center">
              Si vous ne possédez pas de compte cliquez
              <a href="/signup" className="text-GreenComp">
                <span className="text-red-500"> ici</span>
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
