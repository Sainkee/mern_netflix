import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Hero from "./components/home/Hero";
import Layout from "./pages/Layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Layout component as the parent
      children: [
        {
          index: true,
          element: <Hero />, // Hero component as the default child for "/"
        },
        {
          path: "login",
          element: <Login />, // Login component at "/login"
        },
        {
          path: "signup",
          element: <Signup />, // Signup component at "/signup"
        },
      ],
    },
  ]);

  return (
    <>
    <ToastContainer position="bottom-right" />
    <RouterProvider router={router}></RouterProvider>
  </>
  );
}
