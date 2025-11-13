import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

export default function EditViewModal({
  isOpen,
  onClose,
  view,
  onSave
}) {
  const [rating, setRating] = useState(0);
  const [dateFinish, setDateFinish] = useState('');

  useEffect(() => {
    if (view) {
      setRating(view.rating || 0);
      setDateFinish(
        view.dateFinish
          ? new Date(view.dateFinish).toISOString().split('T')[0]
          : ''
      );
    }
  }, [view]);

  const handleSave = () => {
    onSave({
      rating,
      dateFinish
    });
  };

  if (!isOpen || !view) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        z-50 p-4 animate-fadeIn
      "
    >
      {/* MODAL */}
      <div
        className="
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl rounded-2xl
          max-w-xl w-full
          overflow-hidden
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Editar Vista
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Actualizá tu puntuación o fecha de visualización.
          </p>
        </div>

        {/* BODY */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4 text-white">
            {view.movieTitle}
          </h3>

          {/* RATING */}
          <div className="mb-8">
            <p className="text-gray-300 mb-2">Mi Puntuación:</p>

            <StarRating
              rating={rating}
              onRatingChange={setRating}
              isEditing={true}
            />

            {rating > 0 && (
              <p className="text-gray-400 text-sm mt-2">
                {rating}/5 Estrellas
              </p>
            )}
          </div>

          {/* DATE */}
          <div>
            <label className="block mb-2 text-white font-medium">
              Fecha en que viste la película (opcional):
            </label>

            <input
              type="date"
              value={dateFinish}
              onChange={(e) => setDateFinish(e.target.value)}
              className="
                w-full px-4 py-2 rounded-xl
                bg-white/10 text-white
                border border-white/20
                focus:border-red-600
                transition
              "
            />
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            p-6 border-t border-white/10
            flex gap-4 justify-end
            bg-black/10 backdrop-blur-xl
          "
        >
          <button
            onClick={onClose}
            className="
              px-6 py-2 rounded-xl
              bg-white/10 hover:bg-white/20
              text-white font-semibold
              transition shadow
            "
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="
              px-6 py-2 rounded-xl font-semibold
              bg-red-600 hover:bg-red-700
              text-white shadow-lg hover:shadow-xl transition
            "
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}