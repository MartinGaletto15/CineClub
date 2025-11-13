import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { decodeTokenHelper, fetchLogin } from "./loginServices";
import { errorToast, successToast } from "../notifications/Notifications";

export default function Login() {
  const navigate = useNavigate();
  const { handleUserLogin } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const validateLogin = () => {
    if (!formData.email.trim()) {
      errorToast("Ingresá tu email.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errorToast("Email inválido.");
      return false;
    }

    if (!formData.password.trim()) {
      errorToast("Ingresá tu contraseña.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);

    try {
      const responseData = await fetchLogin(formData.email, formData.password);

      if (!responseData.token) {
        throw new Error("No se recibió un token válido.");
      }

      const decoded = decodeTokenHelper(responseData.token);
      const { name, lastName, avatar, email, role, id } = decoded;

      handleUserLogin(responseData.token, name, lastName, avatar, email, role, id);

      successToast("Inicio de sesión exitoso");
      navigate("/home");

    } catch (error) {
      errorToast(error.message || "Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center px-6">

      {/* 🔥 Fondo cinematográfico */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c"
          alt="cinema"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* 🔥 Luces animadas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] animate-pulse-slow -top-40 -left-40"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slower bottom-0 right-0"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-8 py-10 animate-fadeIn">

        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Bienvenido a <span className="text-red-500">CineClub</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="
                w-full px-4 py-3 rounded-lg 
                bg-black/40 border border-white/10 
                text-white placeholder-gray-400
                focus:border-red-500 focus:ring-2 focus:ring-red-600/40
              "
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="
                w-full px-4 py-3 rounded-lg 
                bg-black/40 border border-white/10 
                text-white placeholder-gray-400
                focus:border-red-500 focus:ring-2 focus:ring-red-600/40
              "
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold 
              bg-red-600 hover:bg-red-700 
              text-white shadow-lg shadow-red-900/40
              transition-all disabled:bg-red-600/40
            "
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-red-500 font-semibold hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}