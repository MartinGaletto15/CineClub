using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class View
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }   // Navegación (nullable, correcto)

        [Required]
        public int MovieId { get; set; }
        public Movie? Movie { get; set; } // Navegación (nullable, correcto)

        public float Rating { get; set; }

        [Column(TypeName = "date")]
        public DateTime DateFinish { get; set; }
    }
}