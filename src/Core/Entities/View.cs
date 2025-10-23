using System.ComponentModel.DataAnnotations;

namespace Core.Entities;
public class View
{
    [Required]
    public int Id { get; set; }

    // Clave Foránea para User
    [Required]
    public int UserId { get; set; } // FK (tipo int y termina en "Id")
    public User User { get; set; } // Propiedad de Navegación

    // Clave Foránea para Movie
    [Required]
    public int MovieId { get; set; } // FK (tipo int y termina en "Id")
    public Movie Movie { get; set; } // Propiedad de Navegación

    public decimal Rating { get; set; }
    public DateTime ViewDate { get; set; }
}