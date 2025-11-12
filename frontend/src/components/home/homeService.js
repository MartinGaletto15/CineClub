const API_URL = import.meta.env.VITE_BASE_SERVER_URL

export const getPopularMovies = async () => {
    return fetch(`${API_URL}/api/movies/Popular`, {
        headers: {},
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) throw new Error('Error fetching Movies popularMovies')
            return res.json()
        })
}