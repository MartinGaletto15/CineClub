import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import { successToast } from '../notifications/Notifications';

const Navbar = () => {
  const { token, name, handleUserLogout, role } = useContext(AuthContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isUserLoggedIn = !!token;
  const isAdmin = role === 'Admin' || role === 'SuperAdmin';
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

  const navigationLinks = [
    { label: 'Inicio', path: '/home' },
    { label: 'Películas', path: '/movies' },
    { label: 'Mi Lista', path: '/watchlist' },
    ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : [])
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y nombre */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span 
                className="text-red-600 text-2xl font-bold cursor-pointer hover:text-red-700 transition"
                onClick={() => navigate('/')}
              >
                CineClub
              </span>
            </div>
          </div>

          {/* Navegación central (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  link.label === 'Admin' 
                    ? 'text-yellow-400 hover:text-yellow-300 bg-gray-800 hover:bg-gray-700' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Botones de acción (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isUserLoggedIn ? (
              <>
                <span className="text-gray-300 text-sm font-medium">
                  ¡Hola, {name}!
                </span>
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button 
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition" 
                  onClick={handleLogin}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition" 
                  onClick={handleRegister}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Enlaces de navegación móvil */}
            {navigationLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition ${
                  link.label === 'Admin'
                    ? 'text-yellow-400 hover:text-yellow-300 bg-gray-700 hover:bg-gray-600'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="border-t border-gray-700 my-2"></div>

            {/* Botones de autenticación móvil */}
            {isUserLoggedIn ? (
              <button 
                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Cerrar Sesión ({name})
              </button>
            ) : (
              <>
                <button 
                  className="w-full text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => {
                    handleLogin();
                    setIsMenuOpen(false);
                  }}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition"
                  onClick={() => {
                    handleRegister();
                    setIsMenuOpen(false);
                  }}
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