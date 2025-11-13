export default function MovieItem({ movie, onClick }) {

  return (
    <div
      onClick={onClick}
      className="
        relative rounded-xl overflow-hidden cursor-pointer
        group shadow-lg shadow-black/30
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-xl
      "
    >

      {/* === Poster === */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="
          w-full h-80 object-cover
          transition-transform duration-300
          group-hover:scale-110
        "
      />

      {/* === Overlay oscuro suave === */}
      <div
        className="
          absolute inset-0 bg-black/40 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
        "
      ></div>

      {/* === Contenido === */}
      <div
        className="
          absolute bottom-0 left-0 right-0 
          p-4 md:p-5
          bg-gradient-to-t from-black/80 via-black/40 to-transparent
        "
      >
        {/* Género */}
        {movie.genre && (
          <span className="text-red-400 text-xs font-semibold">
            {movie.genre}
          </span>
        )}

        {/* Título */}
        <h3 className="text-lg md:text-xl font-bold text-white mt-1 line-clamp-1">
          {movie.title}
        </h3>

        {/* Sinopsis corta */}
        {movie.synopsis && (
          <p className="text-gray-300 text-xs mt-1 line-clamp-2">
            {movie.synopsis}
          </p>
        )}
      </div>
    </div>
  );
}