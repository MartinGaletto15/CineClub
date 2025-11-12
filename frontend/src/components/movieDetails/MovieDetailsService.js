const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const getMovieById = async (id) => {
  const res = await fetch(`${API_URL}/api/movies/${id}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
};