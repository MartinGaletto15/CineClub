import StarRating from './StarRating';

export default function WatchListItem({
  view,
  onEdit,
  onRemove,
  onRatingChange,
  onMovieClick
}) {
  return (
    <div
      className="
        bg-white/5 backdrop-blur-sm
        border border-white/10
        rounded-xl overflow-hidden
        shadow-lg hover:shadow-xl
        transition-all duration-300
        group flex
      "
    >

      {/* POSTER */}
      <div
        className="
          w-32 md:w-40 h-48 md:h-60 flex-shrink-0
          cursor-pointer relative overflow-hidden
        "
        onClick={() => onMovieClick(view.movieId)}
      >
        <img
          src={view.moviePoster}
          alt={view.movieTitle}
          className="
            w-full h-full object-cover
            transition-transform duration-300
            group-hover:scale-110
            group-hover:opacity-90
          "
        />
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 p-6 flex flex-col justify-between">

        {/* TITULO + SINOPSIS */}
        <div>
          <h2
            className="
              text-xl md:text-2xl font-bold mb-2
              cursor-pointer transition
              hover:text-red-500
            "
            onClick={() => onMovieClick(view.movieId)}
          >
            {view.movieTitle}
          </h2>

          <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-3">
            {view.movieSynopsis}
          </p>

          {/* DATOS */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-2">
            <span>
              <strong className="text-gray-300">Año:</strong> {view.movieReleaseYear}
            </span>

            {view.genres?.length > 0 && (
              <span>
                <strong className="text-gray-300">Género:</strong> {view.genres.join(', ')}
              </span>
            )}

            {view.dateFinish && (
              <span>
                <strong className="text-gray-300">Visto:</strong>{" "}
                {new Date(view.dateFinish).toLocaleDateString("es-ES")}
              </span>
            )}
          </div>
        </div>

        {/* RATING + ACCIONES */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
          
          {/* RATING */}
          <div>
            <p className="text-gray-300 mb-1">Mi Puntuación:</p>

            <StarRating
              rating={view.rating}
              onRatingChange={(newRating) => onRatingChange(view.id, newRating)}
              isEditing={true}
            />

            {view.rating && (
              <p className="text-gray-400 text-xs mt-1">
                {view.rating}/5 Estrellas
              </p>
            )}
          </div>

          {/* BOTONES */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onEdit}
              className="
                px-4 py-2 md:px-5 md:py-2
                rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white text-sm font-semibold
                shadow-md hover:shadow-lg
                transition-all
              "
            >
              Editar
            </button>

            <button
              onClick={onRemove}
              className="
                px-4 py-2 md:px-5 md:py-2
                rounded-lg
                bg-red-600 hover:bg-red-700
                text-white text-sm font-semibold
                shadow-md hover:shadow-lg
                transition-all
              "
            >
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}