const API_URL = import.meta.env.VITE_BASE_SERVER_URL

export const getMovies = async () => {
    return fetch(`${API_URL}/api/movies`, {
        headers: {},
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) throw new Error('Error fetching Movies getMovies')
            return res.json()
        })
}