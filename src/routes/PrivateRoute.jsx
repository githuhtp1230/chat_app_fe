import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PATH from "../constants/path";

const PrivateRoute = () => {
  const isLogged = useSelector((state) => state.profile.data);

  return isLogged ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default PrivateRoute;
