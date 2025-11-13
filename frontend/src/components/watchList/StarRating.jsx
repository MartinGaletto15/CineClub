export default function StarRating({ rating, onRatingChange, isEditing = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (rating || 0);

        return (
          <button
            key={star}
            onClick={() => {
              if (isEditing) onRatingChange(star);
            }}
            disabled={!isEditing}
            className={`
              text-3xl md:text-4xl
              transition-all duration-300
              ${isEditing ? "cursor-pointer" : "cursor-default"}

              ${
                isActive
                  ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]"
                  : "text-gray-500 hover:text-yellow-200"
              }

              ${isEditing ? "hover:scale-110 active:scale-95" : ""}
            `}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}