export default function EmptyWatchList({ onExploreClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">

      {/* Ilustración o ícono minimalista */}
      <div className="mb-6 opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5V8.25A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v8.25m-18 0A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 16.5m-18 0v-.75m18 .75v-.75M6.75 12h.008v.008H6.75V12zm3 0h.008v.008H9.75V12zm3 0h.008v.008H12.75V12z"
          />
        </svg>
      </div>

      {/* Título elegante */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Tu lista está vacía
      </h2>

      {/* Mensaje descriptivo */}
      <p className="text-gray-400 text-lg max-w-md mb-8">
        Aún no agregaste ninguna película. Explora el catálogo y guardá las que te gusten.
      </p>

      {/* Botón CTA */}
      <button
        onClick={onExploreClick}
        className="
          bg-red-600 hover:bg-red-700
          px-8 py-3 rounded-lg font-semibold
          shadow-lg hover:shadow-xl
          transition-all duration-300
        "
      >
        Explorar Películas
      </button>
    </div>
  );
}