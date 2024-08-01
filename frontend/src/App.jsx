import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Hero from "./components/home/Hero";
import Layout from "./pages/Layout.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DynamicPage from "./pages/DynamicPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import SeachHistory from "./pages/SeachHistory.jsx";
import SearchPage from "./pages/SearchPage.jsx";

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
          element: <ProtectedRoute element={<Login />} redirectTo={"/"} />,
        },
        {
          path: "signup",
          element: <ProtectedRoute element={<Signup />} redirectTo={"/"} />,
        },
        {
          path: "watch/:contentType/:id",
          element: <DynamicPage />,
        },
        {
          path: "/history",
          element: <SeachHistory />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
