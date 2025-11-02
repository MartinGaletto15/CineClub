using Domain.Entities;
using System.Linq;

namespace Application.Models;

public record ViewDto(
    int Id,
    float? Rating,
    DateTime? DateFinish,
    string UserName,
    string MovieTitle
)
{
    public static ViewDto Create(View entity)
    {
        var dto = new ViewDto(
            entity.Id,
            entity.Rating,
            entity.DateFinish,
            entity.User.Name,
            entity.Movie.Title
        );

        return dto;
    }

    public static List<ViewDto> Create(IEnumerable<View> entities)
    {
        return entities.Select(Create).ToList();
    }
}