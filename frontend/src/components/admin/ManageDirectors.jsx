import { useState, useEffect } from 'react';
import { directorService } from './adminPanelService';
import NameDescFormModal from './NameDescFormModal';

export default function ManageDirectors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingDirector, setEditingDirector] = useState(null);

  useEffect(() => {
    fetchDirectors();
  }, []);

  const fetchDirectors = async () => {
    try {
      setLoading(true);
      const data = await directorService.getAll();
      setDirectors(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingDirector(null);
    setShowModal(true);
  };

  const handleEdit = (director) => {
    setEditingDirector(director);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este director?')) return;
    try {
      await directorService.delete(id);
      setDirectors(directors.filter((d) => d.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingDirector) {
        const updated = await directorService.update(editingDirector.id, data);
        setDirectors(directors.map((d) => (d.id === editingDirector.id ? updated : d)));
      } else {
        const created = await directorService.create(data);
        setDirectors([...directors, created]);
      }
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-slate-400">Cargando directores...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">🎬 Gestionar Directores</h2>

        <button
          onClick={handleCreate}
          className="
            px-5 py-3 bg-red-600 hover:bg-red-700 
            rounded-lg text-white font-semibold 
            shadow-lg hover:shadow-xl transition-all
          "
        >
          + Nuevo Director
        </button>
      </div>

      {error && (
        <div className="bg-red-600/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* GRID DE DIRECTORES */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {directors.map((director) => (
          <div
            key={director.id}
            className="
              bg-slate-800/60 backdrop-blur 
              border border-slate-700 rounded-xl 
              p-5 flex justify-between items-center shadow-lg
              hover:border-red-600 transition-all
            "
          >
            <span className="text-lg text-white font-semibold tracking-wide">
              {director.name}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(director)}
                className="
                  px-3 py-1 bg-blue-600 text-white 
                  rounded text-sm hover:bg-blue-700 transition
                "
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(director.id)}
                className="
                  px-3 py-1 bg-red-600 text-white 
                  rounded text-sm hover:bg-red-700 transition
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
          title={editingDirector ? 'Editar Director' : 'Nuevo Director'}
          initialName={editingDirector?.name || ''}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}