using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests;

public record UpdateMovieRequest(

    string? Title,

    int? DirectorId,

    DateOnly? ReleaseDate,

    decimal? Duration,

    string? Synopsis,

    string? Poster,

    List<int>? GenreIds
);