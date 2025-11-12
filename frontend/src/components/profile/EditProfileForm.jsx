import { useState } from 'react';

export default function EditProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    description: profile?.description || '',
    avatar: profile?.avatar || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-8 space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Editar Información</h3>

      {/* Nombre */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full bg-slate-700 border rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition ${
            errors.name ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="Tu nombre"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Apellido */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Apellido</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full bg-slate-700 border rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition ${
            errors.lastName ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="Tu apellido"
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full bg-slate-700 border rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition ${
            errors.email ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="tu@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">URL del Avatar</label>
        <input
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition"
          placeholder="https://ejemplo.com/avatar.jpg"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition resize-none"
          placeholder="Cuéntanos sobre ti..."
        />
      </div>

      {/* Botones */}
      <div className="flex gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}