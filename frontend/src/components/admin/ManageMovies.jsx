import { useState, useEffect } from 'react';
import { movieService, genreService, directorService } from './adminPanelService';
import MovieFormModal from './MovieFormModal';

export default function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [moviesData, genresData, directorsData] = await Promise.all([
        movieService.getAll(),
        genreService.getAll(),
        directorService.getAll(),
      ]);
      setMovies(moviesData);
      setGenres(genresData);
      setDirectors(directorsData);
      setError(null);
    } catch (err) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingMovie(null);
    setShowModal(true);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta película?')) return;
    try {
      await movieService.delete(id);
      setMovies(movies.filter((m) => m.id !== id));
    } catch (err) {
      setError(err.message ?? String(err));
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingMovie) {
        const updated = await movieService.update(editingMovie.id, data);
        setMovies(movies.map((m) => (m.id === updated.id ? updated : m)));
      } else {
        const created = await movieService.create(data);
        setMovies([...movies, created]);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      setError(err.message ?? String(err));
    }
  };

  /* ------------------------------------------------------- */
  /*                       UI RENDER                         */
  /* ------------------------------------------------------- */

  if (loading)
    return <div className="text-slate-400">Cargando películas...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">🎬 Gestionar Películas</h2>

        <button
          onClick={handleCreate}
          className="
            px-5 py-3 bg-red-600 hover:bg-red-700 
            rounded-lg text-white font-semibold shadow-lg 
            transition-all
          "
        >
          + Nueva Película
        </button>
      </div>

      {error && (
        <div className="bg-red-600/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* GRID DE PELICULAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {movies.map((movie) => {
          const directorName =
            movie.director?.name ?? movie.directorName ?? "-";

          const genreList =
            movie.genres ?? movie.genreDtos ?? movie.genreIds ?? [];

          return (
            <div
              key={movie.id}
              className="
                bg-slate-800/60 backdrop-blur-md rounded-xl 
                shadow-lg border border-slate-700 
                hover:border-red-600 transition-all
                flex flex-col
              "
            >
              {/* POSTER */}
              <div className="h-60 w-full overflow-hidden rounded-t-xl">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1 justify-between">

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {movie.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {directorName} •{" "}
                    {movie.releaseDate?.slice?.(0, 10) ??
                      movie.releaseDate ??
                      "-"}
                  </p>

                  {/* GENRES */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {genreList.map((g) => {
                      const name =
                        typeof g === "string"
                          ? g
                          : g?.name ?? String(g);

                      return (
                        <span
                          key={name}
                          className="
                            bg-red-600/20 text-red-300 
                            px-2 py-1 rounded text-xs font-semibold
                          "
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="
                      px-3 py-1 bg-blue-600 rounded 
                      text-white text-sm hover:bg-blue-700 
                    "
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="
                      px-3 py-1 bg-red-600 rounded 
                      text-white text-sm hover:bg-red-700
                    "
                  >
                    Eliminar
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {showModal && (
        <MovieFormModal
          movie={editingMovie}
          genres={genres}
          directors={directors}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}