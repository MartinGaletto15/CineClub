import { useCallback, useEffect, useState } from "react";
import { warningToast } from "../notifications/Notifications";
import { AuthContext } from "./AuthContext";
import { isTokenValid } from "./AuthContextHelper";

export const AuthContextProvider = ({ children }) => {

    const [name, setName] = useState(() => localStorage.getItem("name"));
    const [lastName, setLastName] = useState(() => localStorage.getItem("lastName"));
    const [avatar, setAvatar] = useState(() => localStorage.getItem("avatar"));
    const [email, setEmail] = useState(() => localStorage.getItem("email"));
    const [role, setRole] = useState(() => localStorage.getItem("role"));
    const [id, setId] = useState(() => localStorage.getItem("id"));
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const handleUserLogin = useCallback((token, name, lastName, avatar, email, role, id) => {
        localStorage.setItem("name", name);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        localStorage.setItem("id", id);
        localStorage.setItem("token", token);

        setName(name);
        setLastName(lastName);
        setAvatar(avatar);
        setEmail(email);
        setRole(role);
        setId(id);
        setToken(token);
    }, []);

    const handleUserLogout = useCallback(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("lastName");
        localStorage.removeItem("avatar");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        localStorage.removeItem("token");

        setName(null);
        setLastName(null);
        setAvatar(null);
        setEmail(null);
        setRole(null);
        setId(null);
        setToken(null);
    }, []);

    const updateAvatar = useCallback((newAvatar) => {
        localStorage.setItem("avatar", newAvatar);
        setAvatar(newAvatar);
    }, []);

    const updateRole = useCallback((newRole) => {
        localStorage.setItem("role", newRole);
        setRole(newRole);
    }, []);

    const updateName = useCallback((newName) => {
        localStorage.setItem("name", newName);
        setName(newName);
    }, []);

    const updateLastName = useCallback((newLastName) => {
        localStorage.setItem("lastName", newLastName);
        setLastName(newLastName);
    }, []);


    useEffect(() => {
        let logoutTimer;

        if (!token) {
            return;
        }

        try {
            const timeRemaining = isTokenValid(token);


            if (timeRemaining > 0) {
                logoutTimer = setTimeout(() => {
                    warningToast("Tu sesión ha expirado.");
                    handleUserLogout();
                }, timeRemaining);

            } else {
                handleUserLogout();
            }

        } catch (error) {
            handleUserLogout();
        }

        return () => {
            if (logoutTimer) {
                clearTimeout(logoutTimer);
            }
        };

    }, [token, handleUserLogout]);


    return (
        <AuthContext.Provider value={{
            name,
            lastName,
            avatar,
            role,
            token,
            id,
            email,
            updateAvatar,
            updateRole,
            updateName,
            updateLastName,
            handleUserLogin,
            handleUserLogout
        }}>
            {children}
        </AuthContext.Provider>
    );
};