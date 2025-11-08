function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">CineClub</h3>
            <p className="text-gray-400">Tu destino cinematográfico favorito</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Inicio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Películas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Series</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Mi Lista</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">support@cineclub.com</li>
              <li className="text-gray-400">+1 234 567 890</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CineClub. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer