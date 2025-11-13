import { useState, useEffect } from 'react';

export default function NameDescFormModal({ title, initialName, onSave, onClose }) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name });
  };

  return (
    <div
      className="
        fixed inset-0 bg-black/60 backdrop-blur-sm 
        flex items-center justify-center z-50 px-4
        animate-fadeIn
      "
    >
      <div
        className="
          bg-slate-900/80 border border-slate-700
          rounded-2xl shadow-2xl w-full max-w-md p-8
          animate-scaleIn
        "
      >
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-xl">
          {title}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-300 text-sm font-semibold">Nombre</label>
            <input
              type="text"
              placeholder="Escribe un nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="
                w-full px-4 py-3 rounded-lg 
                bg-slate-800 border border-slate-600
                text-white placeholder-slate-500
                focus:border-red-600 focus:outline-none
                transition-all shadow-inner
              "
            />
          </div>

          {/* BOTONES */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                px-5 py-2 bg-slate-700/70 text-white rounded-lg font-semibold
                hover:bg-slate-600 transition shadow-md
              "
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="
                px-5 py-2 bg-red-600 hover:bg-red-700 
                text-white rounded-lg font-semibold
                shadow-md hover:shadow-xl transition
              "
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      {/* Animaciones */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
          }

          @keyframes scaleIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
        `}
      </style>
    </div>
  );
}