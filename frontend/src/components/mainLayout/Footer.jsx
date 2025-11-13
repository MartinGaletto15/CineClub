import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="
        bg-slate-950/90 backdrop-blur-md
        border-t border-white/10
        text-gray-400
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* LOGO + DESCRIPCIÓN */}
          <div>
            <h3 className="text-white text-2xl font-extrabold tracking-tight mb-4">
              CineClub
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Donde tus películas cobran vida.  
              Guardá, explorá y descubrí miles de historias.
            </p>
          </div>

          {/* ENLACES DE NAVEGACIÓN */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4 uppercase tracking-wide">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/home"
                  className="hover:text-white transition cursor-pointer"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  to="/movies"
                  className="hover:text-white transition cursor-pointer"
                >
                  Películas
                </Link>
              </li>

              <li>
                <Link
                  to="/watchlist"
                  className="hover:text-white transition cursor-pointer"
                >
                  Mi Lista
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition cursor-pointer"
                >
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* REDES SOCIALES */}
          <div>
            <h4 className="text-white text-lg font-bold mb-4 uppercase tracking-wide">
              Redes Sociales
            </h4>

            <div className="flex items-center gap-6 text-2xl">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition"
              >
                <FaFacebook />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/KevinKener/CineClub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <FaGithub />
              </a>

            </div>
          </div>

        </div>

        {/* LÍNEA DIVISORIA */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CineClub — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;