import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

import ManageMovies from "./ManageMovies.jsx";
import ManageUsers from "./ManageUsers.jsx";
import ManageGenres from "./ManageGenres.jsx";
import ManageDirectors from "./ManageDirectors.jsx";

export default function AdminPanel() {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  const [tab, setTab] = useState("movies");

  // 🚫 Vista de acceso denegado
  if (!role || (role !== "Admin" && role !== "SuperAdmin")) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md bg-slate-900/80 border border-slate-700 p-8 rounded-2xl text-center shadow-xl">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl text-white font-bold mb-2">Acceso denegado</h2>
          <p className="text-slate-400 mb-6">
            No tenés permisos suficientes para acceder al panel de administración.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "movies", label: "Películas" },
    { key: "genres", label: "Géneros" },
    { key: "directors", label: "Directores" },
    ...(role === "SuperAdmin" ? [{ key: "users", label: "Usuarios" }] : []),
  ];

  const renderTabContent = () => {
    switch (tab) {
      case "movies":
        return <ManageMovies />;
      case "users":
        return <ManageUsers role={role} />;
      case "genres":
        return <ManageGenres />;
      case "directors":
        return <ManageDirectors />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* 🎬 HEADER */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-red-400/70 mb-1">
              Panel de Administración
            </p>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">
              CineClub Admin
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl">
              Gestioná el contenido del sistema de forma cómoda, rápida y segura.
            </p>
          </div>

          {/* 🎭 Rol del usuario */}
          <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg w-fit">
            <p className="text-xs text-slate-400">Sesión actual</p>
            <p className="text-sm text-slate-300 mt-1">Rol asignado</p>

            <span
              className={`inline-flex mt-2 px-3 py-1 rounded-full text-sm font-semibold border
              ${
                role === "SuperAdmin"
                  ? "bg-red-600/20 text-red-300 border-red-500/40"
                  : "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
              }`}
            >
              {role}
            </span>
          </div>
        </header>

        {/* 🧭 TABS */}
        <nav className="flex flex-wrap gap-3 mb-8 pb-3 border-b border-slate-800">
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`
                  px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  flex items-center gap-2
                  ${
                    active
                      ? "bg-red-600 text-white shadow-red-900/40 shadow-lg scale-[1.05]"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }
                `}
              >
                <span className="w-2 h-2 rounded-full bg-current opacity-70" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* 📦 CONTENT */}
        <div
          className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl 
          animate-[fadeIn_0.25s_ease-out]"
        >
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}