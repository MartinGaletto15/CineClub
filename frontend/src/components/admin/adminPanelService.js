const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// ==================== MOVIES ====================
export const movieService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/api/movies`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Error al obtener películas');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/movies/${id}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Película no encontrada');
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/movies`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear película');
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar película');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar película');
  },
};

// ==================== GENRES ====================
export const genreService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/api/genres`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Error al obtener géneros');
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/genres`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear género');
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/api/genres/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar género');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/genres/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar género');
  },
};

// ==================== DIRECTORS ====================
export const directorService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/api/directors`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Error al obtener directores');
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(`${API_BASE_URL}/api/directors`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear director');
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/api/directors/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar director');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/directors/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Error al eliminar director');
  },
};

// ==================== USERS ====================
export const userService = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/api/admin/users`, { headers: getHeaders() });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Error al obtener usuarios');
    }
    return res.json();
  },

  // Mantengo updateRole para que ManageUsers no tenga que cambiarse
  updateRole: async (id, data) => {
    // data se espera como { Role: number } (enum numeric) o { role: number }
    const payload = {};
    if (data?.Role !== undefined) payload.Role = data.Role;
    else if (data?.role !== undefined) payload.Role = data.role;
    else if (data?.roleName) {
      // fallback por si se envía name (no debería)
      const map = { SuperAdmin: 0, Admin: 1, User: 2 };
      payload.Role = map[data.roleName] ?? 2;
    } else {
      // si viene dato directo (número) o cualquier otro objeto, lo enviamos tal cual
      Object.assign(payload, data);
    }

    const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Error al actualizar usuario');
    }
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Error al eliminar usuario');
    }
  },
};