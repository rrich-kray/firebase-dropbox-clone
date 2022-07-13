import React, { useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./PrivateRoute.css";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
