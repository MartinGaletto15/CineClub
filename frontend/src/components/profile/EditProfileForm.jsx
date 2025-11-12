import { useState } from 'react';

export default function EditProfileForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    lastName: profile?.lastName || '',
    password: '',
    confirmPassword: '',
    description: profile?.description || '',
    avatar: profile?.avatar || '',
  });

  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    
    if (formData.password || formData.confirmPassword) {
      if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
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
      // No enviar campos vacíos de contraseña
      const dataToSend = { ...formData };
      if (!dataToSend.password) {
        delete dataToSend.password;
        delete dataToSend.confirmPassword;
      } else {
        delete dataToSend.confirmPassword;
      }
      onSave(dataToSend);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-xl p-8 space-y-6 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">Editar Información</h3>

      {/* Nombre */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full bg-slate-700/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:bg-slate-700 transition ${
            errors.name ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="Tu nombre"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Apellido */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Apellido</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full bg-slate-700/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:bg-slate-700 transition ${
            errors.lastName ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="Tu apellido"
        />
        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
      </div>

      {/* Nueva Contraseña */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Nueva Contraseña</label>
        <div className="relative">
          <input
            type={showPasswords ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full bg-slate-700/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:bg-slate-700 transition ${
              errors.password ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder="Deja en blanco si no deseas cambiar"
          />
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition"
          >
            {showPasswords ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
      </div>

      {/* Confirmar Contraseña */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">Confirmar Contraseña</label>
        <input
          type={showPasswords ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full bg-slate-700/50 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:bg-slate-700 transition ${
            errors.confirmPassword ? 'border-red-500' : 'border-slate-600'
          }`}
          placeholder="Confirma tu nueva contraseña"
        />
        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      {/* Avatar URL */}
      <div>
        <label className="block text-slate-300 font-semibold mb-2">URL del Avatar</label>
        <input
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:bg-slate-700 transition"
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
          className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:bg-slate-700 transition resize-none"
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