import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "./movieDetailsService";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);
    getMovieById(id)
      .then((data) => setMovie(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-600 text-white p-4 rounded mb-4">Error: {error}</div>
          <div>
            <Link to="/movies" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
              Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="text-gray-300">No se encontró la película.</div>
          <div className="mt-4">
            <Link to="/movies" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
              Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const release = movie.releaseDate ? new Date(movie.releaseDate) : null;
  const releaseStr = release ? release.toLocaleDateString("es-AR") : "-";
  const poster = movie.poster ?? "";

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-16 flex">
      <div className="container mx-auto px-14 py-12 self-center">
        <div className="max-w-5xl mx-auto bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Poster */}
            <div className="md:w-1/3 bg-gray-700 flex items-center justify-center p-6">
              {poster ? (
                <img src={poster} alt={movie.title} className="w-full h-auto rounded" />
              ) : (
                <div className="w-full h-64 bg-gray-600 flex items-center justify-center text-gray-300">
                  Sin póster
                </div>
              )}
            </div>

            {/* Detalles */}
            <div className="md:w-2/3 p-6">
              <h1 className="text-2xl font-semibold mb-2 text-white">{movie.title}</h1>
              <p className="text-sm text-gray-300 mb-3">Director: {movie.directorName ?? "-"}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                <span>Estreno: {releaseStr}</span>
                <span>· Duración: {movie.duration ?? "-"} min</span>
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {movie.genres.map((g, i) => (
                    <span key={i} className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                      {g}
                    </span>
                  ))}
                </div>
              )}

              <h2 className="text-lg font-medium mb-2 text-white">Sinopsis</h2>
              <p className="text-gray-300 whitespace-pre-line">
                {movie.synopsis ?? "Sin sinopsis disponible."}
              </p>

              <div className="mt-6 flex gap-3">
                <Link to="/movies" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Volver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}