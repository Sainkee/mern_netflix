import React from "react";
import InHome from "./InHome";
import Home from "./Home";
import { useSelector } from "react-redux";

export default function Hero() {
  
  const isLoggedIn = useSelector(
    (state) => state.authenication.isAuthenticated
  );

  console.log(isLoggedIn);

  return <>{isLoggedIn ? <InHome /> : <Home />}</>;
}
