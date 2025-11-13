import { useState, useEffect } from 'react';

export default function MovieFormModal({ movie, genres, directors, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    directorId: '',
    releaseDate: '',
    duration: '',
    synopsis: '',
    poster: '',
    genreIds: [],
  });

  useEffect(() => {
    if (movie) {
      let release = movie.releaseDate ?? movie.releaseDateString ?? '';
      if (release && release.includes('T')) release = release.split('T')[0];

      setFormData({
        title: movie.title ?? '',
        directorId: movie.directorId ?? movie.director?.id ?? '',
        releaseDate: release,
        duration: movie.duration ?? '',
        synopsis: movie.synopsis ?? '',
        poster: movie.poster ?? '',
        genreIds:
          (movie.genreIds ??
           movie.genres ??
           movie.genreDtos)?.map(g => (typeof g === 'object' ? g.id : g)) ?? [],
      });
    } else {
      setFormData({
        title: '',
        directorId: '',
        releaseDate: '',
        duration: '',
        synopsis: '',
        poster: '',
        genreIds: [],
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (genreId) => {
    setFormData(prev => ({
      ...prev,
      genreIds: prev.genreIds.includes(genreId)
        ? prev.genreIds.filter(id => id !== genreId)
        : [...prev.genreIds, genreId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
    title: formData.title,
    directorId: parseInt(formData.directorId),
    releaseDate: formData.releaseDate,
    duration: parseInt(formData.duration),
    synopsis: formData.synopsis,
    poster: formData.poster,
    genreIds: formData.genreIds.map(id => parseInt(id)),
});

  };

  return (
    <div
      className="
        fixed inset-0 bg-black/60 backdrop-blur-sm 
        flex items-center justify-center z-50 p-6
        animate-fadeIn
      "
    >
      <div
        className="
          bg-slate-900/80 border border-slate-700 
          rounded-2xl shadow-2xl w-full max-w-3xl p-8
          max-h-screen overflow-y-auto
          animate-scaleIn
        "
      >
        {/* TÍTULO */}
        <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-xl">
          {movie ? 'Editar Película' : 'Nueva Película'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TÍTULO */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3 rounded-lg 
                bg-slate-800 border border-slate-600
                text-white placeholder-slate-500
                focus:outline-none focus:border-red-600
                transition
              "
              placeholder="Ej: The Batman"
            />
          </div>

          {/* DIRECTOR */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block">Director</label>
            <select
              name="directorId"
              value={formData.directorId}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3 rounded-lg 
                bg-slate-800 border border-slate-600
                text-white
                focus:outline-none focus:border-red-600
              "
            >
              <option value="">Selecciona un director...</option>
              {directors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* FECHA DE LANZAMIENTO */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block">Fecha de estreno</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3 rounded-lg 
                bg-slate-800 border border-slate-600 text-white
                focus:outline-none focus:border-red-600
              "
            />
          </div>

          {/* DURACIÓN */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block">Duración (min)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3 rounded-lg 
                bg-slate-800 border border-slate-600 text-white
                focus:outline-none focus:border-red-600
              "
              placeholder="Ej: 140"
            />
          </div>

          {/* POSTER */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block">URL del Poster</label>
            <input
              type="text"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3 rounded-lg 
                bg-slate-800 border border-slate-600 text-white
                placeholder-slate-500
                focus:outline-none focus:border-red-600
              "
              placeholder="https://image.tmdb.org/..."
            />
          </div>

          {/* SINOPSIS */}
          <div>
            <label className="text-slate-300 font-semibold mb-2 block">Sinopsis</label>
            <textarea
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              rows="4"
              className="
                w-full px-4 py-3 rounded-lg 
                bg-slate-800 border border-slate-600 text-white
                placeholder-slate-500
                focus:outline-none focus:border-red-600
              "
              placeholder="Descripción breve de la película..."
            />
          </div>

          {/* GÉNEROS */}
          <div>
            <label className="text-slate-300 font-semibold mb-3 block">Géneros</label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {genres.map(g => (
                <label
                  key={g.id}
                  className="
                    flex items-center gap-2 
                    bg-slate-800 border border-slate-700 
                    px-3 py-2 rounded-lg text-slate-300
                    hover:border-red-600 transition
                  "
                >
                  <input
                    type="checkbox"
                    checked={formData.genreIds.includes(g.id)}
                    onChange={() => handleGenreToggle(g.id)}
                  />
                  {g.name}
                </label>
              ))}
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="
                px-6 py-2 rounded-lg font-semibold
                bg-slate-700 hover:bg-slate-600 text-white
                transition
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                px-6 py-2 rounded-lg font-semibold
                bg-red-600 hover:bg-red-700 text-white
                shadow-lg hover:shadow-xl
                transition
              "
            >
              Guardar
            </button>
          </div>

        </form>
      </div>

      {/* Animaciones */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn .22s ease-out; }

          @keyframes scaleIn {
            0% { transform: scale(.92); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn { animation: scaleIn .25s ease-out; }
        `}
      </style>
    </div>
  );
}