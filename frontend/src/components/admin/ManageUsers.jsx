import { useState, useEffect } from 'react';
import { userService } from './adminPanelService';
import UserFormModal from './UserFormModal';

export default function ManageUsers({ role }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro? Esta acción no se puede deshacer.")) return;
    try {
      await userService.delete(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingUser) {
        const updated = await userService.updateRole(editingUser.id, data);
        setUsers(users.map(u => u.id === editingUser.id ? updated : u));
      }
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-10">
        <div className="animate-spin h-10 w-10 border-2 border-red-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-3">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 shadow-lg backdrop-blur">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Gestionar Usuarios</h2>
          <p className="text-slate-400 text-sm mt-1">Administra roles y accesos del sistema</p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-600/20 border border-red-600/40 text-red-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border border-slate-700">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-800/70">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-700 hover:bg-slate-700/30 transition"
              >
                <td className="p-3">{user.name} {user.lastName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${user.role === "SuperAdmin" ? "bg-red-600/30 text-red-400" :
                        user.role === "Admin" ? "bg-yellow-600/30 text-yellow-300" :
                        "bg-blue-600/30 text-blue-300"}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-3 text-center">
                  {role === "SuperAdmin" ? (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition"
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <span className="text-slate-500 text-sm italic">
                      Sin permisos
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <UserFormModal
          user={editingUser}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}