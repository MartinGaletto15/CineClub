import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieItem from '../movieItem/MovieItem';
import { getPopularMovies } from './HomeService';

export default function Home() {
  const navigate = useNavigate();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const movies = await getPopularMovies();
        setFeaturedMovies(movies);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">

      {error && (
        <div className="bg-red-600 p-4 mb-4 rounded max-w-3xl mx-auto">
          {error}
        </div>
      )}

      {/* 🎬 HERO SECTION (Optimizada y Profesional) */}
      {featuredMovies.length > 0 && (
        <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">

          {/* Imagen del poster (SIEMPRE proporcionada) */}
          <img
            src={featuredMovies[0].poster}
            alt={featuredMovies[0].title}
            className="
              absolute inset-0 
              w-full h-full 
              object-cover object-center 
              rounded-none
              transition-all duration-700
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>

          {/* Contenido */}
          <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12">

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 drop-shadow-xl">
              {featuredMovies[0].title}
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-xl line-clamp-3 mb-6">
              {featuredMovies[0].synopsis}
            </p>

            <button
              onClick={() => handleMovieClick(featuredMovies[0].id)}
              className="
                bg-red-600 hover:bg-red-700 
                transition-all duration-300 
                text-white font-semibold 
                py-3 px-6 rounded-lg 
                shadow-lg hover:scale-[1.05]
                w-fit
              "
            >
              Ver Detalles
            </button>
          </div>
        </section>
      )}

      {/* 🔽 CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Sección bienvenida */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¡Bienvenido a CineClub!</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
            Descubre miles de películas, crea tu lista personalizada y compartí tus favoritas.
          </p>
        </div>

        {/* Películas destacadas */}
        {featuredMovies.length > 1 && (
          <div className="mb-24">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8">Películas Destacadas</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredMovies.slice(1, 5).map(movie => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <button
            onClick={() => navigate('/movies')}
            className="
              bg-white/5 hover:bg-white/10 
              p-8 rounded-xl text-left transition-all 
              border border-white/10 hover:border-white/20 
              shadow-md hover:shadow-xl
            "
          >
            <h4 className="text-xl font-semibold mb-2">Películas</h4>
            <p className="text-gray-400">Explorá todas las películas disponibles.</p>
          </button>

          <button
            onClick={() => navigate('/watchlist')}
            className="
              bg-white/5 hover:bg-white/10 
              p-8 rounded-xl text-left transition-all 
              border border-white/10 hover:border-white/20 
              shadow-md hover:shadow-xl
            "
          >
            <h4 className="text-xl font-semibold mb-2">Mi Lista</h4>
            <p className="text-gray-400">Accedé rápido a tus películas guardadas.</p>
          </button>
        </div>

      </div>
    </div>
  );
}