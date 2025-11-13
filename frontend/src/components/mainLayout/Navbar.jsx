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

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    successToast("Nos vemos pronto 🤗");
    handleUserLogout();
  };
  const handleRegister = () => navigate("/register");

  const navigationLinks = [
    { label: 'Inicio', path: '/home' },
    { label: 'Películas', path: '/movies' },
    ...(isUserLoggedIn ? [{ label: 'Mi Lista', path: '/watchlist' }] : []),
    ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : [])
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div
            className="text-red-500 text-2xl font-extrabold tracking-tight cursor-pointer hover:text-red-400 transition"
            onClick={() => navigate('/')}
          >
            Cine<span className="text-white">Club</span>
          </div>

          {/* LINKS DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`
                  text-sm font-medium transition 
                  ${link.label === 'Admin'
                    ? 'text-yellow-400 hover:text-yellow-300 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md'
                    : 'text-gray-200 hover:text-red-400'}
                `}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ACCIONES DERECHA */}
          <div className="hidden md:flex items-center space-x-4">

            {isUserLoggedIn && (
              <button
                onClick={() => navigate('/profile')}
                className="text-sm font-semibold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md text-gray-200 transition shadow"
              >
                Mi Perfil
              </button>
            )}

            {!isUserLoggedIn ? (
              <>
                <button
                  className="text-gray-300 hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition"
                  onClick={handleLogin}
                >
                  Iniciar Sesión
                </button>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow"
                  onClick={handleRegister}
                >
                  Registrarse
                </button>
              </>
            ) : (
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition shadow"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            )}
          </div>

          {/* MENÚ MÓVIL */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>

      {/* MENÚ MÓVIL EXPANDIDO */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0f172a]/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-3 space-y-2">

            {navigationLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setIsMenuOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-base font-medium transition
                  ${link.label === 'Admin'
                    ? 'text-yellow-400 hover:text-yellow-300 bg-white/10 hover:bg-white/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'}
                `}
              >
                {link.label}
              </button>
            ))}

            {isUserLoggedIn && (
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-white/10 transition"
              >
                Mi Perfil
              </button>
            )}

            <div className="border-t border-white/10 my-2"></div>

            {!isUserLoggedIn ? (
              <>
                <button
                  className="w-full text-left text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-base font-medium transition"
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
            ) : (
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Cerrar Sesión ({name})
              </button>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;