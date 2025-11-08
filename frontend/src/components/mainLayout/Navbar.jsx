import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import { successToast } from '../notifications/Notifications';

const Navbar = () => {
  // Asegúrate de que AuthContext esté importado correctamente arriba
  const { token, name, handleUserLogout } = useContext(AuthContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Esta variable ya funciona correctamente
  const isUserLoggedIn = !!token; 
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login")
  }

  const handleLogout = () => {
    successToast("Nos vemos pronto 🤗");
    handleUserLogout();
  }

  const handleRegister = () => {
    navigate("/register")
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y nombre (Sin Cambios) */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-red-600 text-2xl font-bold">CineClub</span>
            </div>
          </div>

          {/* Botones de acción (Versión Desktop/md) */}
          <div className="hidden md:flex items-center space-x-4">
            {isUserLoggedIn ? (
              // Logueado
              <>
                {/* Muestra el nombre del usuario */}
                <span className="text-gray-300 text-sm font-medium">
                  ¡Hola, {name}!
                </span>
                {/* Botón de Cerrar Sesión */}
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              // No Logueado
              <>
                <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogin}>
                  Iniciar Sesión
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium" onClick={handleRegister}>
                  Registrarse
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isUserLoggedIn ? (
              // Logueado
              <button 
                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium"
                onClick={handleLogout}
              >
                Cerrar Sesión ({name})
              </button>
            ) : (
              // No Logueado
              <>
                <button 
                  className="w-full text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={handleLogin}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium"
                  onClick={handleRegister}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;