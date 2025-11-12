using Domain.Entities;
using System.Linq;
using System.Collections.Generic;
using System; // Necesario para DateOnly

namespace Application.Models;

public record ViewDto(
    int Id,
    float? Rating,
    DateOnly? DateFinish,
    string UserName,
    string MovieTitle,
    string MoviePoster,
    string MovieSynopsis,
    List<string> Genres,
    int MovieReleaseYear
)
{
    public static ViewDto Create(View entity)
    {

        var dto = new ViewDto(
            entity.Id,
            entity.Rating,
            entity.DateFinish,
            entity.User.Name,
            entity.Movie.Title,
            entity.Movie.Poster!,
            entity.Movie.Synopsis!,
            entity.Movie.Genres.Select(g => g.Name).ToList(), 
            entity.Movie.ReleaseDate.Year 
        );

        return dto;
    }

    public static List<ViewDto> Create(IEnumerable<View> entities)
    {
        return entities.Select(Create).ToList();
    }
}