const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const fetchRegister = async (name, lastName, email, password, avatar) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            lastName,
            email,
            password,
            avatar: avatar || undefined
        })
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || data.message || "Error al registrarse"); 
    }

    try {
        const data = await response.json();
        return data;
    } catch (e) {
        return { success: true };
    }

}