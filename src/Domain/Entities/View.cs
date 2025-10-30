using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class View
    {
        [Required]
        public int Id { get; set; }

        // Relación con User
        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User? User { get; set; }

        // Relación con Movie
        [Required]
        [ForeignKey("Movie")]
        public int MovieId { get; set; }
        public Movie? Movie { get; set; }

        public float Rating { get; set; }
        public DateTime DateFinish { get; set; }
    }
}