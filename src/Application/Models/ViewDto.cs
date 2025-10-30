using Domain.Entities;

namespace Application.Models
{
    public record ViewDto(
        int Id,
        int UserId,
        int MovieId,
        float Rating,
        DateTime DateFinish)
    {
        public static ViewDto Create(View entity)
        {
            return new ViewDto(
                entity.Id,
                entity.UserId,
                entity.MovieId,
                entity.Rating,
                entity.DateFinish
            );
        }

        public static List<ViewDto> Create(IEnumerable<View> entities)
        {
            var listDto = new List<ViewDto>();
            foreach (var entity in entities)
            {
                listDto.Add(Create(entity));
            }

            return listDto;
        }
    }
}