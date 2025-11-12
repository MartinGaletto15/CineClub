import StarRating from './StarRating';

export default function WatchListItem({
    view,
    onEdit,
    onRemove,
    onRatingChange,
    onMovieClick
}) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition flex">
            {/* Imagen del póster */}
            <div
                className="w-32 h-48 flex-shrink-0 cursor-pointer"
                onClick={() => onMovieClick(view.movieId)}
            >
                <img
                    src={view.moviePoster}
                    alt={view.movieTitle}
                    className="w-full h-full object-cover hover:opacity-80 transition"
                />
            </div>

            {/* Contenido de la película */}
            <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                    <h2
                        className="text-2xl font-bold mb-2 cursor-pointer hover:text-red-600 transition"
                        onClick={() => onMovieClick(view.movieId)}
                    >
                        {view.movieTitle}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">{view.movieSynopsis}</p>
                    <div className="flex gap-4 mb-4 text-sm flex-wrap">
                        <span className="text-gray-300">
                            <strong>Año:</strong> {view.movieReleaseYear}
                        </span>
                        {view.genres && view.genres.length > 0 && (
                            <span className="text-gray-300">
                                <strong>Género:</strong> {view.genres.join(', ')}
                            </span>
                        )}
                        {view.dateFinish && (
                            <span className="text-gray-300">
                                <strong>Visto:</strong> {new Date(view.dateFinish).toLocaleDateString('es-ES')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Sección de puntuación */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-300 mb-2">Mi Puntuación:</p>
                        <StarRating
                            rating={view.rating}
                            onRatingChange={(newRating) => onRatingChange(view.id, newRating)}
                            isEditing={true}
                        />
                        {view.rating && (
                            <p className="text-gray-400 text-sm mt-1">
                                Puntuación: {view.rating}/5
                            </p>
                        )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-3">
                        <button
                            onClick={onEdit}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition"
                        >
                            Editar
                        </button>
                        <button
                            onClick={onRemove}
                            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold transition"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}