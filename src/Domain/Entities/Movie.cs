using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;
public class Movie
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    // Clave Foránea para Director
    [Required]
    public int DirectorId { get; set; } 
    public Director Director { get; set; } = null!;

    [Required]
    public DateOnly ReleaseDate { get; set; }

    [Required]
    public decimal Duration { get; set; }

    public string? Synopsis { get; set; }

    public string? Poster { get; set; }

    public ICollection<Genre> Genres { get; set; } = new List<Genre>();
}