import React, { useState, useEffect } from 'react';
import { warningToast } from '../notifications/Notifications';

export default function AddMovieModal({
  isOpen,
  onClose,
  onAddMovie,
  availableMovies,
  isLoading
}) {
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
    <div
      className="
        fixed inset-0 bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        z-50 p-4
        animate-fadeIn
      "
    >
      {/* MODAL */}
      <div
        className="
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl rounded-2xl
          max-w-2xl w-full
          flex flex-col max-h-[85vh]
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Agregar Película a Mi Lista
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Buscá una película y agregala a tu watchlist.
          </p>
        </div>

        {/* BODY */}
        <div className="p-6 flex-1 overflow-y-auto">

          {/* SEARCH INPUT */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar película..."
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="
                w-full px-5 py-3 rounded-xl
                bg-white/10 text-white placeholder-gray-400
                border border-white/20 focus:border-red-500
                shadow-inner
                transition
              "
            />
          </div>

          {/* LISTA DE PELÍCULAS */}
          {isLoading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto"></div>
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {filteredMovies.map(movie => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  className={`
                    flex justify-between items-center p-4
                    rounded-xl cursor-pointer border transition
                    ${
                      selectedMovie?.id === movie.id
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'bg-white/5 border-white/10 hover:border-red-500'
                    }
                  `}
                >
                  <div>
                    <p className="font-semibold text-lg">{movie.title}</p>
                    <p className="text-sm text-gray-300">
                      {movie.releaseYear || 'Año desconocido'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-center py-6">
              {searchMovie
                ? 'No se encontraron películas'
                : 'Todas las películas ya están en tu lista'}
            </p>
          )}
        </div>

        {/* FECHA OPCIONAL */}
        {selectedMovie && (
          <div className="p-6 border-t border-white/10">
            <label className="block mb-2 text-white font-medium">
              Fecha en que viste la película (opcional):
            </label>

            <input
              type="date"
              value={dateFinish}
              onChange={(e) => setDateFinish(e.target.value)}
              className="
                w-full px-4 py-2 rounded-xl
                bg-white/10 text-white border border-white/20
                focus:border-red-500 transition
              "
            />
          </div>
        )}

        {/* FOOTER */}
        <div
          className="
            p-6 border-t border-white/10 flex gap-4 justify-end
            bg-black/10 backdrop-blur-xl
          "
        >
          <button
            onClick={onClose}
            className="
              px-6 py-2 rounded-xl
              bg-white/10 hover:bg-white/20
              text-white font-semibold
              transition shadow
            "
          >
            Cancelar
          </button>

          <button
            onClick={handleAddClick}
            disabled={!selectedMovie}
            className="
              px-6 py-2 rounded-xl font-semibold
              bg-red-600 hover:bg-red-700
              disabled:bg-gray-600 disabled:cursor-not-allowed
              text-white shadow-lg hover:shadow-xl transition
            "
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}