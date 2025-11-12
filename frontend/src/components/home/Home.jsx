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
        const loadMovies = await getPopularMovies();
        setFeaturedMovies(loadMovies);
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
    <div className="min-h-screen bg-gray-900 text-white">
      {error && <div className="bg-red-600 p-4 mb-4 rounded">{error}</div>}

      {/* Hero Section con Película Destacada */}
      {featuredMovies.length > 0 && (
        <section className="relative h-96 bg-red-800 text-white overflow-hidden">
          {/* Contenedor principal con Flexbox para dividir en dos columnas */}
          <div className="absolute inset-0 flex">
            {/* Columna Izquierda: Contenido de Texto */}
            <div className="w-1/2 bg-gradient-to-r from-black/80 to-black/40 flex flex-col justify-end p-8">
              <h1 className="text-5xl font-bold mb-4">{featuredMovies[0].title}</h1>
              <p className="text-lg mb-6 max-w-xl line-clamp-3">{featuredMovies[0].synopsis}</p>
              <button
                onClick={() => handleMovieClick(featuredMovies[0].id)}
                className="bg-red-600 hover:bg-red-700 transition w-fit px-8 py-3 rounded font-semibold"
              >
                Ver Detalles
              </button>
            </div>

            {/* Columna Derecha: Imagen del Póster */}
            <div className="w-1/2 relative">
              <img
                src={featuredMovies[0].poster}
                alt={featuredMovies[0].title}
                className="w-full h-full object-cover"
              />
              {/* Opcional: Oscurecer un poco la imagen si el texto se ve mal */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>
        </section>
      )}

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-12">
        {/* Sección de Bienvenida */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">¡Bienvenido a CineClub!</h2>
          <p className="text-gray-300 text-lg">
            Descubre miles de películas, crea tu lista personalizada y comparte con otros cinéfilos.
          </p>
        </div>

        {/* Películas Destacadas */}
        {featuredMovies.length > 1 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6">Películas Destacadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMovies.slice(1, 4).map(movie => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Acciones Rápidas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/movies')}
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded text-center transition transform hover:scale-105"
          >
            <h4 className="text-xl font-bold mb-2">Peliculas</h4>
            <p className="text-gray-400">Explora todas las peliculas disponibles</p>
          </button>
          <button
            onClick={() => navigate('/watchlist')}
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded text-center transition transform hover:scale-105"
          >
            <h4 className="text-xl font-bold mb-2">Mi Lista</h4>
            <p className="text-gray-400">Ver tus películas guardadas</p>
          </button>
        </div>
      </div>
    </div>
  );
}