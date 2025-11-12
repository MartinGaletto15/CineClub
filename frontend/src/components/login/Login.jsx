import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { decodeTokenHelper, fetchLogin } from "./loginServices";
import { errorToast, successToast } from "../notifications/Notifications";

const Login = () => {
    const navigate = useNavigate();
    const { handleUserLogin } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const responseData = await fetchLogin(formData.email, formData.password);

            if (!responseData.token) {
                throw new Error("Respuesta inválida, no se encontró el token.");
            }

            const tokenString = responseData.token;

            const data = decodeTokenHelper(tokenString);

            const { name, lastName, avatar, email, role, id } = data;

            handleUserLogin(tokenString, name, lastName, avatar, email, role, id);

            successToast("Inicio de sesión exitoso");
            navigate("/home");

        } catch (error) {
            errorToast(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-300 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                        Ingresar
                    </button>

                    <p className="text-center text-gray-400 mt-2">
                        ¿No tenés cuenta? {" "}
                        <Link to="/register" className="text-blue-400 hover:underline">
                            Registrate
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;