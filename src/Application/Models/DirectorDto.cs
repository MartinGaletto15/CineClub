using System.Data.Common;
using Domain.Entities;

namespace Application.Dtos;

public record DirectorDto(int id, string name)
{
    public static DirectorDto Create(Director entity)
    {
        var dto = new DirectorDto(entity.Id, entity.Name);
        return dto;
    }

    public static List<DirectorDto> Create(IEnumerable<Director> entities)
    {
        var listDto = new List<DirectorDto>();
        foreach (var entity in entities)
        {
            listDto.Add(Create(entity));
        }
        return listDto;
    }
}