using Domain.Entities;
using System.Linq;

namespace Application.Dtos;

public record MovieDto(
    int id,
    string title,
    string DirectorName,
    DateOnly releaseDate,
    int duration,
    string? synopsis,
    string? poster,
    List<string> Genres
)
{
    public static MovieDto Create(Movie entity)
    {
        var dto = new MovieDto(
            entity.Id,
            entity.Title,
            entity.Director.Name,
            entity.ReleaseDate,
            entity.Duration,
            entity.Synopsis,
            entity.Poster,
            entity.Genres.Select(g => g.Name).ToList()
        );

        return dto;
    }

    public static List<MovieDto> Create(IEnumerable<Movie> entities)
    {
        return entities.Select(Create).ToList();
    }
}