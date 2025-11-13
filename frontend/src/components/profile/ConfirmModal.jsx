export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  isDangerous = false,
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
        <p className="text-slate-300 mb-6 text-sm leading-relaxed">{message}</p>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
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