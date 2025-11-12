import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

export default function EditViewModal({ isOpen, onClose, view, onSave }) {
  const [rating, setRating] = useState(0);
  const [dateFinish, setDateFinish] = useState('');

  useEffect(() => {
    if (view) {
      setRating(view.rating || 0);
      setDateFinish(view.dateFinish ? new Date(view.dateFinish).toISOString().split('T')[0] : '');
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">Editar Vista</h2>
        </div>

        <div className="p-6 flex-1">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">{view.movieTitle}</h3>

            <div className="mb-6">
              <p className="text-gray-300 mb-3">Mi Puntuación:</p>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                isEditing={true}
              />
              {rating && (
                <p className="text-gray-400 text-sm mt-2">
                  Puntuación: {rating}/5
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-gray-300">
                <strong>Fecha que viste la película (opcional):</strong>
              </label>
              <input
                type="date"
                value={dateFinish}
                onChange={(e) => setDateFinish(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded font-semibold transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}