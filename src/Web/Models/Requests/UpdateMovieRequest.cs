using System.ComponentModel.DataAnnotations;

namespace Web.Models.Requests;

public record UpdateMovieRequest(
    [Required]
    int Id,

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