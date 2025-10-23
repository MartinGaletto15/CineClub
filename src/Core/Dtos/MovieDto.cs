using Core.Entities;

namespace Core.Dtos;

public record MovieDto(int id, string title, Director director, Genre genre, DateOnly releaseDate, decimal duration, string synopsis, string poster)
{
    public static MovieDto Create(Movie entity)
    {
        var dto = new MovieDto(entity.Id, entity.Title, entity.Director, entity.Genre, entity.ReleaseDate, entity.Duration, entity.Synopsis, entity.Poster);

        return dto;
    }

    public static List<MovieDto> Create(IEnumerable<Movie> entities)
    {
        var listDto = new List<MovieDto>();
        foreach (var entity in entities)
        {
            listDto.Add(Create(entity));
        }

        return listDto;
    }
}