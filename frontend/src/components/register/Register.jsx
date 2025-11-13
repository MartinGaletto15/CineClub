import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { errorToast, successToast } from "../notifications/Notifications";
import { fetchRegister } from "./registerServices";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // 🔍 Validaciones profesionales
  const validateForm = () => {
    const { name, lastName, email, password, confirmPassword, avatar } = formData;

    if (!name.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      errorToast("Completa todos los campos obligatorios.");
      return false;
    }

    if (/\d/.test(name)) {
      errorToast("El nombre no puede contener números.");
      return false;
    }

    if (/\d/.test(lastName)) {
      errorToast("El apellido no puede contener números.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorToast("Email inválido.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      errorToast("La contraseña debe tener mínimo 6 caracteres, una letra y un número.");
      return false;
    }

    if (password !== confirmPassword) {
      errorToast("Las contraseñas no coinciden.");
      return false;
    }

    if (avatar.trim() !== "" && !/^https?:\/\/.+/i.test(avatar)) {
      errorToast("La URL del avatar no es válida.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await fetchRegister(
        formData.name,
        formData.lastName,
        formData.email,
        formData.password,
        formData.avatar
      );

      successToast("Registro exitoso");
      navigate("/login");

    } catch (error) {
      errorToast(error.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center px-6">

      {/* 🎥 Fondo cine */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
          className="w-full h-full object-cover opacity-40"
          alt="Cinema"
        />
      </div>

      {/* ✨ Luces dinámicas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[650px] h-[650px] bg-red-700/20 rounded-full blur-[150px] animate-pulse-slow -top-32 -left-32"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] animate-pulse-slower bottom-0 right-0"></div>
      </div>

      {/* 🧊 Card glass */}
      <div className="relative z-10 w-full max-w-lg bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-10 py-12 animate-fadeIn">

        <h2 className="text-4xl font-bold text-white text-center mb-8">
          Crear cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Nombre</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white
                           focus:border-red-500 focus:ring-2 focus:ring-red-600/40 transition"
                placeholder="Juan"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Apellido</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white
                           focus:border-red-500 focus:ring-2 focus:ring-red-600/40 transition"
                placeholder="Pérez"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white
                         focus:border-red-500 focus:ring-2 focus:ring-red-600/40 transition"
              placeholder="email@ejemplo.com"
            />
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Contraseña</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white
                           focus:border-red-500 focus:ring-2 focus:ring-red-600/40 transition"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Confirmar</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white
                           focus:border-red-500 focus:ring-2 focus:ring-red-600/40 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Avatar */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">
              Avatar (URL opcional)
            </label>
            <input
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white
                         focus:border-red-500 focus:ring-2 focus:ring-red-600/40 transition"
              placeholder="https://imagen.com/avatar.jpg"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold 
              bg-red-600 hover:bg-red-700 
              text-white shadow-lg shadow-red-900/40
              transition disabled:bg-red-600/40
            "
          >
            {loading ? "Procesando..." : "Crear cuenta"}
          </button>

          <p className="text-gray-400 text-center mt-4">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-red-500 hover:underline font-semibold">
              Ingresar
            </Link>
          </p>
        </form>
      </div>

      {/* Animaciones */}
      <style>{`
        .animate-fadeIn { animation: fadeIn .7s ease forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-pulse-slow { animation: pulseSlow 7s infinite alternate; }
        @keyframes pulseSlow {
          from { transform: scale(0.9); opacity: .4; }
          to { transform: scale(1.1); opacity: .7; }
        }

        .animate-pulse-slower { animation: pulseSlower 12s infinite alternate; }
        @keyframes pulseSlower {
          from { transform: scale(1); opacity: .3; }
          to { transform: scale(1.25); opacity: .6; }
        }
      `}</style>
    </div>
  );
}