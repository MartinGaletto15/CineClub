import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isTokenValid } from "../context/AuthContextHelper";

export default function Public() {
  const { token } = useContext(AuthContext);

  // Si el usuario ESTÁ logueado → redirigir al home
  if (isTokenValid(token)) {
    return <Navigate to="/home" replace />;
  }

  // Si NO está logueado → dejarlo entrar a rutas públicas
  return <Outlet />;
}