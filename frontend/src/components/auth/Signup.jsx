import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useSignUpMutation } from "../../redux/apiSlice";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";

export default function Signup() {
  // Extract email from query parameters (if provided) to pre-fill the email field.
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const dispatch = useDispatch();
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "email") setEmail(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "profileImage") setProfileImage(files[0]); // Handle file input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !username || !password || !profileImage) {
      toast.error("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("profile", profileImage);

      await signUp(formData).unwrap();

      const result = await login({ email, password }).unwrap();

      toast.success("Successfully signed up!");

      dispatch(loginUser(result.user));

      navigate("/", { replace: true });
      setEmail("");
      setUsername("");
      setPassword("");
      setProfileImage(null);
    } catch (err) {
      if (err.status === 409) {
        // Handling specific error case for user already existing
        toast.error(err.data.message);
        navigate("/login?email=" + email);
      } else {
        // Handling other errors
        toast.error("Failed to sign up. Please try again.");
      }
      console.error("Failed to sign up:", err);
    }
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
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  required
                />
              </div>
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
              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-300"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="text-center text-gray-400 mt-4">
            Already a member?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
