import MovieItem from "../movieItem/MovieItem";

function MovieSection({ title, movies }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movies.map(movie => (
                    <MovieItem key = {movie.id} movie ={movie} />
                ))}
            </div>
        </div>
    )
}

export default MovieSection