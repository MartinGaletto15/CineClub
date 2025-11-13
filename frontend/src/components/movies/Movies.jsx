import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieItem from '../movieItem/MovieItem';
import { getMovies } from './movieService';

export default function Movies({
  moviesPerPage: moviesPerPageProp = null
}) {
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const moviesPerPage = moviesPerPageProp || 6;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const loadMovies = await getMovies();
        setAllMovies(loadMovies);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrado
  const filteredMovies = allMovies.filter(movie =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / moviesPerPage));

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24">

      {error && (
        <div className="bg-red-600 p-4 mb-4 rounded max-w-3xl mx-auto">
          {error}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TÍTULO */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight drop-shadow-xl">
          Todas las Películas
        </h1>

        {/* SEARCH BAR PRO */}
        <div className="mb-14">
          <input
            type="text"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="
              w-full px-6 py-4 rounded-xl
              bg-white/5 text-white placeholder-gray-400
              border border-white/10 focus:border-red-600
              backdrop-blur-sm
              transition-all duration-300
              shadow-md focus:shadow-lg
            "
          />
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : currentMovies.length > 0 ? (
          <>
            {/* GRID PRO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-16">
              {currentMovies.map(movie => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>

            {/* PAGINACIÓN MODERNA */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-8 mt-12">
                
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="
                    px-6 py-3 rounded-lg font-semibold bg-red-600 
                    hover:bg-red-700 transition disabled:bg-gray-700 
                    disabled:text-gray-400 disabled:cursor-not-allowed
                  "
                >
                  Anterior
                </button>

                <span className="text-gray-300 text-lg">
                  Página <span className="font-bold text-white">{currentPage}</span> de {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="
                    px-6 py-3 rounded-lg font-semibold bg-red-600 
                    hover:bg-red-700 transition disabled:bg-gray-700 
                    disabled:text-gray-400 disabled:cursor-not-allowed
                  "
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              {searchTerm 
                ? 'No se encontraron películas que coincidan con tu búsqueda.' 
                : 'No hay películas disponibles en este momento.'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}