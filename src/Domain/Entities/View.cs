using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class View
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required, ForeignKey("UserId")] // Le dice a EF que esta propiedad usa 'UserId'
        public User User { get; set; } = null!;

        [Required]
        public int MovieId { get; set; }

        [Required, ForeignKey("MovieId")] // Le dice a EF que esta propiedad usa 'MovieId'
        public Movie Movie { get; set; } = null!;

        public float? Rating { get; set; }
        public DateTime? DateFinish { get; set; }
    }
}