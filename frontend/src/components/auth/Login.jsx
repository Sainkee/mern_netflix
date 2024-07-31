import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/apiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";

export default function Signup() {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(emailValue || "");

  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name, e.target.value);
    if (name === "email") setEmail(value);

    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };
    try {
      const result = await login(userData).unwrap();

      toast.success("Successfully logged In!");

      await dispatch(loginUser(result.user)); // Dispatch login action if user should be logged in immediately

      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        error?.data?.message || "Failed to log in! Please try again."
      );
      console.error("log in error:", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="hero_bg h-screen w-full flex flex-col justify-center items-center text-white">
      <header className="max-w-6xl mx-auto flex p-4">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="logo"
            className="w-52 hover:opacity-80 transition-opacity duration-300"
          />
        </Link>
      </header>

      <div className="mt-10 flex justify-center items-center w-full">
        <div className="w-full max-w-md bg-black/70 rounded-lg shadow-lg p-8 space-y-6">
          <h1 className="text-center text-white text-3xl font-bold mb-4">
            Log in
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
              >
                {isLoading ? "logging..." : "log in"}
              </button>
            </div>
          </form>
          <div className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
