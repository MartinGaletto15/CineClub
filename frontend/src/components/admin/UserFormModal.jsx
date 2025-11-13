import { useState, useEffect } from 'react';

export default function UserFormModal({ user, onSave, onClose }) {
  const [role, setRole] = useState('User');

  useEffect(() => {
    if (user) {
      setRole(user.role ?? user.Role ?? 'User');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mapear a int según enum del backend: SuperAdmin=0, Admin=1, User=2
    const map = { SuperAdmin: 0, Admin: 1, User: 2 };
    const roleInt = map[role] ?? 2;
    // Enviar la propiedad Role (coincide con UpdateUserRequest.Role)
    onSave({ Role: roleInt });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Editar Rol de Usuario</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Usuario: <span className="font-semibold">{user?.name} {user?.lastName}</span></label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}