import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getMovieById } from "./MovieDetailsService";
import { addToWatchList } from "../watchList/watchListService";
import { successToast, errorToast } from "../notifications/Notifications";

export default function MovieDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext); // Saber si hay usuario
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false); // estado para el botón

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    getMovieById(id)
      .then((data) => setMovie(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToList = async () => {
    try {
      setAdding(true);
      await addToWatchList({
        movieId: movie.id,
        dateFinish: null
      });
      successToast("Película agregada a tu lista 🎬");
    } catch (err) {
      errorToast("No se pudo agregar a tu lista");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-600 p-4 rounded mb-6">Error: {error}</div>
          <Link to="/movies" className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition">
            Volver
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300">No se encontró la película.</p>
          <Link
            to="/movies"
            className="mt-4 inline-block px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
          >
            Volver
          </Link>
        </div>
      </div>
    );
  }

  const release = movie.releaseDate ? new Date(movie.releaseDate) : null;
  const releaseStr = release ? release.toLocaleDateString("es-AR") : "-";

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">

      {/* ===== HERO ===== */}
      <section className="relative w-full h-[75vh] flex items-center overflow-hidden">

        {/* Fondo desenfocado */}
        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

        {/* Contenido principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-10 items-center">

          {/* Poster */}
          <div className="w-60 md:w-72 lg:w-80 shadow-2xl rounded-lg overflow-hidden border border-white/10">
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          {/* Panel Glass */}
          <div className="max-w-2xl p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">

            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-300 text-sm">
              <span>{releaseStr}</span>
              <span>•</span>
              <span>{movie.duration} min</span>
              {movie.directorName && (
                <>
                  <span>•</span>
                  <span>Director: {movie.directorName}</span>
                </>
              )}
            </div>

            {/* IMDB fake rating */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="text-yellow-300 font-bold text-lg">
                {(Math.random() * (8.8 - 6.5) + 6.5).toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">/ 10 • IMDB Score</span>
            </div>

            {/* Géneros */}
            {movie.genres?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-4">
                {movie.genres.map((g, i) => (
                  <span
                    key={i}
                    className="bg-red-600/80 px-3 py-1 rounded text-xs font-semibold tracking-wide"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* ===== ADD TO WATCHLIST ===== */}
            {token && (
              <button
                onClick={handleAddToList}
                disabled={adding}
                className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold shadow-lg transition disabled:bg-gray-700"
              >
                {adding ? "Agregando..." : "Agregar a Mi Lista"}
              </button>
            )}

          </div>

        </div>
      </section>

      {/* ===== SINOPSIS ===== */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <h2 className="text-2xl font-bold mb-4">Sinopsis</h2>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {movie.synopsis}
        </p>

        <div className="mt-12">
          <Link
            to="/movies"
            className="px-5 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition font-medium"
          >
            Volver
          </Link>
        </div>
      </div>

    </div>
  );
}