import { useState } from "react";
import { errorToast, successToast } from "../notifications/Notifications";

export default function EditProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    description: profile?.description || "",
    avatar: profile?.avatar || "",
  });

  // VALIDACIONES FULL PRO
  const validate = () => {
    const { name, lastName, email, avatar } = formData;

    if (!name.trim()) {
      errorToast("El nombre es obligatorio.");
      return false;
    }
    if (/\d/.test(name)) {
      errorToast("El nombre no puede contener números.");
      return false;
    }

    if (!lastName.trim()) {
      errorToast("El apellido es obligatorio.");
      return false;
    }
    if (/\d/.test(lastName)) {
      errorToast("El apellido no puede contener números.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorToast("Email inválido.");
      return false;
    }

    if (avatar.trim() !== "" && !/^https?:\/\/.+/i.test(avatar)) {
      errorToast("La URL del avatar no es válida.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    successToast("Perfil actualizado");
    onSave(formData);
  };

  const printAvatar =
    formData.avatar ||
    `https://ui-avatars.com/api/?background=ef4444&color=fff&name=${encodeURIComponent(
      formData.name + " " + formData.lastName
    )}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800/60 backdrop-blur border border-slate-700 rounded-xl p-8 space-y-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-white mb-4">Editar Información</h3>

      {/* PREVIEW */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={printAvatar}
          alt="Avatar preview"
          className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
        />
        <span className="text-slate-300 text-sm">
          Vista previa del avatar.
        </span>
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="
            w-full bg-slate-700 border border-slate-600 rounded-lg 
            px-4 py-2 text-white focus:outline-none focus:border-red-500
          "
        />
      </div>

      {/* Apellido */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Apellido</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          className="
            w-full bg-slate-700 border border-slate-600 rounded-lg 
            px-4 py-2 text-white focus:outline-none focus:border-red-500
          "
        />
      </div>

      {/* Confirmar Contraseña */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Confirmar Contraseña</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="
            w-full bg-slate-700 border border-slate-600 rounded-lg 
            px-4 py-2 text-white focus:outline-none focus:border-red-500
          "
        />
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">
          URL del Avatar
        </label>
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={(e) =>
            setFormData({ ...formData, avatar: e.target.value })
          }
          className="
            w-full bg-slate-700 border border-slate-600 rounded-lg 
            px-4 py-2 text-white focus:outline-none focus:border-red-500
          "
          placeholder="https://ejemplo.com/avatar.jpg"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">
          Descripción
        </label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="
            w-full bg-slate-700 border border-slate-600 rounded-lg 
            px-4 py-2 text-white resize-none focus:outline-none
            focus:border-red-500
          "
          placeholder="Contanos sobre vos…"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}