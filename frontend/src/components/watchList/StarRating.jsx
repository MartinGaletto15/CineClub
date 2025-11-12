export default function StarRating({ rating, onRatingChange, isEditing = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => {
            if (isEditing) {
              onRatingChange(star);
            }
          }}
          disabled={!isEditing}
          className={`text-2xl transition ${
            star <= (rating || 0)
              ? 'text-yellow-400'
              : 'text-gray-600 hover:text-yellow-300'
          } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}