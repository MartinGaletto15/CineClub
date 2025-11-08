
function MovieItem({ movie }) {
    return (
        <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover"
            />
            <div className="p-6">
                <span className="text-sm text-red-500 font-semibold">{movie.genre}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{movie.title}</h3>
                <p className="text-gray-400">{movie.synopsis}</p>
            </div>
        </div>
    )
}

export default MovieItem;