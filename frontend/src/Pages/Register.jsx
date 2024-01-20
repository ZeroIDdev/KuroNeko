import { useEffect, useState } from "react";
import useRegister from "../hooks/useRegister";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {error,loading,register} = useRegister()
  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email,password)
  };
  useEffect(() => {
    console.log(password);
    console.log(email);
  });
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Sign Up
        </h1>
        <form className="mt-6" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
        {error&&<h1>{error}</h1>}
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          You have an account?{" "}
          <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
