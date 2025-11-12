import React, { useState, useEffect } from 'react';
import { warningToast } from '../notifications/Notifications';

export default function AddMovieModal({ isOpen, onClose, onAddMovie, availableMovies, isLoading }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateFinish, setDateFinish] = useState('');
  const [searchMovie, setSearchMovie] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedMovie(null);
      setDateFinish('');
      setSearchMovie('');
    }
  }, [isOpen]);

  const handleAddClick = () => {
    if (!selectedMovie) {
      warningToast('Selecciona una película');
      return;
    }

    onAddMovie({
      movieId: selectedMovie.id,
      dateFinish: dateFinish
    });
  };

  const filteredMovies = availableMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Agregar Película a Mi Lista</h2>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar película..."
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-red-600 focus:outline-none"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredMovies.map(movie => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className={`p-4 rounded cursor-pointer transition border-2 ${
                    selectedMovie?.id === movie.id
                      ? 'bg-red-600 border-red-600'
                      : 'bg-gray-700 border-gray-600 hover:border-red-600'
                  }`}
                >
                  <p className="font-semibold">{movie.title}</p>
                  <p className="text-sm text-gray-300">{movie.releaseYear}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-6">
              {searchMovie ? 'No se encontraron películas' : 'Todas las películas están en tu lista'}
            </p>
          )}
        </div>

        {selectedMovie && (
          <div className="p-6 border-t border-gray-700">
            <label className="block mb-2 text-gray-300">
              <strong>Fecha que viste la película (opcional):</strong>
            </label>
            <input
              type="date"
              value={dateFinish}
              onChange={(e) => setDateFinish(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-600 focus:outline-none"
            />
          </div>
        )}

        <div className="p-6 border-t border-gray-700 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-semibold transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddClick}
            disabled={!selectedMovie}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded font-semibold transition"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}