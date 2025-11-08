
namespace Application.Dtos;
public record GenreDto(
    int id,
    string name)
{
    public static GenreDto Create(Domain.Entities.Genre entity)
    {
        var dto = new GenreDto(entity.Id, entity.Name);
        return dto;
    }

    public static List<GenreDto> Create(IEnumerable<Domain.Entities.Genre> entities)
    {
        var listDto = new List<GenreDto>();
        foreach (var entity in entities)
        {
            listDto.Add(Create(entity));
        }
        return listDto;
    }
}