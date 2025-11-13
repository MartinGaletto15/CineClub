import { useState, useEffect } from 'react';
import { genreService } from './adminPanelService';
import NameDescFormModal from './NameDescFormModal';

export default function ManageGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const data = await genreService.getAll();
      setGenres(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingGenre(null);
    setShowModal(true);
  };

  const handleEdit = (genre) => {
    setEditingGenre(genre);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este género?')) return;
    try {
      await genreService.delete(id);
      setGenres(genres.filter((g) => g.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingGenre) {
        const updated = await genreService.update(editingGenre.id, data);
        setGenres(genres.map((g) => (g.id === editingGenre.id ? updated : g)));
      } else {
        const created = await genreService.create(data);
        setGenres([...genres, created]);
      }
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Cargando géneros...</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">🎭 Gestionar Géneros</h2>

        <button
          onClick={handleCreate}
          className="
            px-5 py-3 bg-red-600 hover:bg-red-700 
            rounded-lg text-white font-semibold shadow-lg 
            transition-all
          "
        >
          + Nuevo Género
        </button>
      </div>

      {error && (
        <div className="bg-red-600/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* GRID DE GÉNEROS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="
              bg-slate-800/60 backdrop-blur-md 
              border border-slate-700 rounded-xl 
              p-5 flex justify-between items-center shadow-lg
              hover:border-red-600 transition-all
            "
          >
            {/* Nombre */}
            <span className="text-lg text-white font-semibold tracking-wide">
              {genre.name}
            </span>

            {/* ACCIONES */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(genre)}
                className="
                  px-3 py-1 bg-blue-600 text-white rounded 
                  text-sm hover:bg-blue-700 transition
                "
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(genre.id)}
                className="
                  px-3 py-1 bg-red-600 text-white rounded 
                  text-sm hover:bg-red-700 transition
                "
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <NameDescFormModal
          title={editingGenre ? 'Editar Género' : 'Nuevo Género'}
          initialName={editingGenre?.name || ''}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}