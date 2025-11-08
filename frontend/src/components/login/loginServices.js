import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_BASE_SERVER_URL;

export const fetchLogin = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); 

    if (!response.ok) {
        throw new Error(data.detail || "Error al iniciar sesión");
    }
    
    return data;
}

export const decodeTokenHelper = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    }
    catch (error){
        console.error("Error al decodificar el token:", error);
        return null;
    }
}