
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;
public class Movie
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; }

    // Clave Foránea para Director
    [Required]
    public int DirectorId { get; set; } // FK (tipo int y termina en "Id")
    public Director Director { get; set; } // Propiedad de Navegación

    // Clave Foránea para Genre
    [Required]
    public int GenreId { get; set; } // FK (tipo int y termina en "Id")
    public Genre Genre { get; set; } // Propiedad de Navegación

    [Required]
    public DateOnly ReleaseDate { get; set; }

    [Required]
    public decimal Duration { get; set; }

    public string Synopsis { get; set; }

    public string Poster { get; set; }
}