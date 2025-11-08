import { useEffect, useState } from "react";
import MovieSection from "../movieSection/MovieSection";
import { getMovies } from "./LandingServices";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    useEffect(() => {
        const loadData = async () => {
            const loadMovies = await getMovies();
            setMovies(loadMovies);
        }

        loadData();
    }, [])

    return (
        <div className="bg-gray-900 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[70vh] bg-black">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                <img
                    src="https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
                    className="w-full h-full object-cover opacity-50"
                    alt="Hero background"
                />
                <div className="absolute inset-0 flex items-center z-20 px-8 md:px-16">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Descubre y Organiza tus Películas Favoritas
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Mantén un registro de las películas que quieres ver, las que estás viendo y las que ya has visto.
                        </p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors" onClick={handleLogin}>
                            Comenzar Ahora
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Movies Section */}
            <MovieSection title={"Peliculas destacadas"} movies={movies} />

            {/* Features Section */}
            <div className="bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">¿Por qué usar CineClub?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4 text-red-500">📝</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Organiza tu Lista</h3>
                            <p className="text-gray-400">Mantén un registro ordenado de todas las películas que quieres ver</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4 text-red-500">⭐</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Califica y Reseña</h3>
                            <p className="text-gray-400">Comparte tus opiniones y calificaciones con otros usuarios</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl mb-4 text-red-500">🎯</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Descubre Más</h3>
                            <p className="text-gray-400">Encuentra nuevas películas basadas en tus gustos</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-16">
                <h2 className="text-3xl font-bold text-white mb-4">
                    ¿Listo para empezar tu viaje cinematográfico?
                </h2>
                <p className="text-gray-400 mb-8">
                    Únete a nuestra comunidad de amantes del cine
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors" onClick={handleRegister}>
                    Crear Cuenta Gratis
                </button>
            </div>
        </div>
    );
};

export default Landing;