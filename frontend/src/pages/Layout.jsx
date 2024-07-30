import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
