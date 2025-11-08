using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests;

public record CreateMovieRequest(

    [Required]
    string Title,

    [Required]
    int DirectorId,

    [Required]
    DateOnly ReleaseDate,

    [Required]
    int Duration,

    string Synopsis,

    [Required]
    string Poster,

    [Required]
    List<int> GenreIds
);