/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    toast.success("Votre message à été envoyer !");
    reset();
  };

  return (
    <div className=" mx-10 lg:mx-96 mt-10 pt-12  border-2 border-blue-600 rounded-md">
      <div className="mt-12 ">
        <p className="text-center text-black text-2xl">
          Vous souhaitez vous inscrire <br />
          ou obtenir plus d'information, contactez nous ici ?
        </p>
      </div>
      <div>
        <form
          className="flex flex-col my-4 mx-10 lg:items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="my-8">
            <p className="text-black ">E-mail</p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@example.com"
              className="rounded-lg p-1 border border-slate-900"
              {...register("email", {
                required: "Veuillez saisir votre email",
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Le format de votre email est incorrect !",
                },
              })}
            />
            {errors?.email && (
              <p className="text-red-500 text-center">
                {" "}
                {errors.email.message}{" "}
              </p>
            )}
          </label>
          <label>
            <p className="text-black">Entrez votre message</p>
            <textarea
              type="text"
              name="name"
              className="rounded-lg h-20 w-full lg:w-80 border border-slate-900"
            />
          </label>
          <div className="border-solid border-GreyComp">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow mt-4"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
