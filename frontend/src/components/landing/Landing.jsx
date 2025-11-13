import { useEffect, useState, useContext } from "react";
import MovieSection from "../movieSection/MovieSection";
import { getMovies } from "./landingServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ⭐ IMPORTANTE

const Landing = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);    // ⭐ Saber si hay sesión
  const [movies, setMovies] = useState([]);

  // 🚫 Si el usuario está logueado → no puede ver el landing
  useEffect(() => {
    if (token) {
      navigate("/home");  // redirige automáticamente
    }
  }, [token, navigate]);

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  // Cargar pelis destacadas
  useEffect(() => {
    const loadData = async () => {
      const loadMovies = await getMovies();
      setMovies(loadMovies);
    };
    loadData();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-white">

      {/* HERO SECTION (Ultra Pro) */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        {/* Backdrop */}
        <img
          src="https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Cine backdrop"
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>

        {/* CONTENT */}
        <div className="relative h-full flex items-center px-8 md:px-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
              Descubrí • Guardá • Rankeá
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              Tu espacio para organizar tus películas favoritas, seguir lo que viste
              y descubrir nuevos clásicos.
            </p>

            <button
              onClick={handleLogin}
              className="
                mt-8 px-10 py-4
                rounded-xl text-lg font-semibold
                bg-red-600 hover:bg-red-700
                shadow-lg hover:shadow-xl
                transition-all
              "
            >
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>

      {/* FEATURED MOVIES */}
      <div className="mt-12">
        <MovieSection title={"Películas destacadas"} movies={movies} />
      </div>

      {/* FEATURES SECTION */}
      <div className="bg-slate-900/60 backdrop-blur-lg py-20 mt-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-extrabold text-center mb-16">
            ¿Por qué usar CineClub?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

            <div className="text-center">
              <div className="text-5xl mb-4 text-red-500">📝</div>
              <h3 className="text-xl font-semibold">Organiza tu Lista</h3>
              <p className="text-gray-400 mt-2">
                Guardá todas las películas que querés ver, viste o abandonaste.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4 text-yellow-400">⭐</div>
              <h3 className="text-xl font-semibold">Califica y Reseña</h3>
              <p className="text-gray-400 mt-2">
                Compartí tu opinión con reviews y puntuaciones.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl mb-4 text-blue-400">🎯</div>
              <h3 className="text-xl font-semibold">Descubre Más</h3>
              <p className="text-gray-400 mt-2">
                Recomendaciones basadas en tus gustos cinéfilos.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="text-center py-20">
        <h2 className="text-4xl font-bold">
          ¿Listo para comenzar tu viaje cinematográfico?
        </h2>

        <p className="text-gray-400 mt-2 mb-10 text-lg">
          Unite a CineClub y empezá a construir tu colección.
        </p>

        <button
          onClick={handleRegister}
          className="
            bg-red-600 hover:bg-red-700
            px-10 py-4 rounded-xl text-lg font-semibold
            shadow-lg hover:shadow-2xl
            transition-all
          "
        >
          Crear Cuenta Gratis
        </button>
      </div>

    </div>
  );
};

export default Landing;