using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests;

public record CreateMovieRequest(

    [Required]
    string Title,

    [Required]
    int DirectorId,

    [Required]
    int GenreId,

    DateOnly? ReleaseDate = null,

    decimal? Duration = null,

    string? Synopsis = null,

    string? Poster = null
);

