import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Optional if decoding token

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode role from token or use localStorage
  let role = null;
  try {
    role = JSON.parse(atob(token.split(".")[1])).role; // Decode JWT payload
  } catch (err) {
    console.error("Invalid token");
    return <Navigate to="/login" />;
  }

  // if (!allowedRoles.includes(role)) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default ProtectedRoute;

