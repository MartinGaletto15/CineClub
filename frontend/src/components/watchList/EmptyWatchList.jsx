export default function EmptyWatchList({ onExploreClick }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-400 text-lg mb-6">No tienes películas en tu lista</p>
      <button
        onClick={onExploreClick}
        className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded font-semibold transition"
      >
        Explorar Películas
      </button>
    </div>
  );
}