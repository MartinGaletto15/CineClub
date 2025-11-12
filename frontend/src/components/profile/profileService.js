const API_URL = import.meta.env.VITE_BASE_SERVER_URL;
// Función auxiliar para crear los headers con el token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Llama a: GET /api/user/me
export const getUserProfile = async () => {
  const res = await fetch(`${API_URL}/api/User/me`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener el perfil');
  return res.json();
};

// Llama a: PUT /api/user/me
export const updateUserProfile = async (formData) => {
  // Nota: formData es el objeto (ej: { name, lastname })
  const res = await fetch(`${API_URL}/api/user/me`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Error al actualizar el perfil');
  }
  return res.json(); // Devuelve el usuario actualizado
};

// Llama a: DELETE /api/user/me
export const deleteUserAccount = async () => {
  const res = await fetch(`${API_URL}/api/user/me`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  // Un 204 No Content (éxito en DELETE) no tiene .json()
  if (res.status === 204) {
    return true; // Éxito
  }

  if (!res.ok) {
    throw new Error('Error al eliminar la cuenta');
  }
};