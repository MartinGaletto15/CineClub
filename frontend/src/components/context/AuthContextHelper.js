import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);

        const expirationTime = (decodedToken.exp * 1000);

        return expirationTime - Date.now();

    } catch (error) {
        console.log("Error decoding token: ", error);
        return false;
    }
}