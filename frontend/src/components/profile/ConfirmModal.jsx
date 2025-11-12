export default function ConfirmModal({ title, message, onConfirm, onCancel, isDangerous = false }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
        <p className="text-slate-300 mb-6">{message}</p>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isDangerous
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}