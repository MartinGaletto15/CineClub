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

  // Filtrar películas según búsqueda
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

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-16">
      {error && <div className="bg-red-600 p-4 mb-4 rounded">{error}</div>}

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12">Todas las Películas</h1>

        {/* Barra de Búsqueda */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Buscar películas..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-6 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-red-600 focus:outline-none transition"
            data-testid="search-input"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : currentMovies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentMovies.map(movie => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-semibold transition"
                >
                  Anterior
                </button>
                <span className="text-gray-300">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-semibold transition"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchTerm ? 'No se encontraron películas' : 'No hay películas disponibles'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}