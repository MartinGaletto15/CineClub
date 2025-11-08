import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { errorToast, successToast } from "../notifications/Notifications";
import { fetchRegister } from "./registerServices";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!formData.name || !formData.lastName || !formData.email || !formData.password) {
            return errorToast("Completa todos los campos requeridos.");
        }
        if (formData.password.length < 6) {
            return errorToast("La contraseña debe tener al menos 6 caracteres.");
        }
        if (formData.password !== formData.confirmPassword) {
            return errorToast("Las contraseñas no coinciden.");
        }

        setLoading(true);

        try {
            await fetchRegister(
                formData.name,
                formData.lastName,
                formData.email,
                formData.password,
                formData.avatar
            );

            successToast("Registro exitoso");
            navigate("/login");
        } catch {
            errorToast(error.message || "Registro fallido. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-300 mb-2">Nombre</label>
                            <input id="name" name="name" value={formData.name} onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-300 mb-2">Apellido</label>
                            <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-gray-300 mb-2">Contraseña</label>
                            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" required />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirmar</label>
                            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" required />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="avatar" className="block text-gray-300 mb-2">Avatar (URL opcional)</label>
                        <input id="avatar" name="avatar" value={formData.avatar} onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none" />
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                        {loading ? "Procesando..." : "Crear cuenta"}
                    </button>

                    <p className="text-center text-gray-400 mt-2">
                        ¿Ya tenés cuenta? <Link to="/login" className="text-blue-400 hover:underline">Ingresar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;