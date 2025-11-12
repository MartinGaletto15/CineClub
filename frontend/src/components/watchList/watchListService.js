const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const getWatchList = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  return fetch(`${API_URL}/api/view/User/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener la lista de películas');
      return res.json();
    });
};

export const getAllMovies = async () => {
  const token = localStorage.getItem('token');

  return fetch(`${API_URL}/api/movies`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener películas');
      return res.json();
    });
};

export const addToWatchList = async (data) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  return fetch(`${API_URL}/api/view`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      userId: userId,
      movieId: data.movieId,
      dateFinish: data.dateFinish
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al agregar película');
      return res.json();
    });
};

// watchListService.js - FUNCIÓN CORREGIDA
export const updateView = async (viewId, updatedData) => { 
  const token = localStorage.getItem('token');

  return fetch(`${API_URL}/api/view/${viewId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    // Enviamos el objeto 'updatedData' tal cual nos lo pasa el modal
    body: JSON.stringify(updatedData) 
  })
    .then(res => {
      // Manejar 204 No Content (UPDATE exitoso sin cuerpo de respuesta)
      if (res.status === 204) {
        return null; 
      }
      // Manejar otros errores
      if (!res.ok) {
        throw new Error('Error al actualizar la vista');
      }
      // Si la API devuelve contenido (poco común en un PUT/204)
      return res.json(); 
    });
};

export const removeFromWatchList = async (viewId) => {
  const token = localStorage.getItem('token');

  return fetch(`${API_URL}/api/view/${viewId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  })
    .then(res => {
      if (res.status === 204) {
        return null;
      }

      throw new Error('Error al eliminar de la lista');
    });
};