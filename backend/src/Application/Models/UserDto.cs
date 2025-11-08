namespace Application.Models
{
    public record UserDto(
        int Id,
        string Name,
        string LastName,
        string Email,
        string Avatar,
        string Description,
        string Role
    )
    {
        public static UserDto Create(Domain.Entities.User entity)
        {
            return new UserDto(
                entity.Id,
                entity.Name,
                entity.LastName,
                entity.Email,
                entity.Avatar,
                entity.Description,
                entity.Role.ToString()
            );
        }

        public static List<UserDto> Create(IEnumerable<Domain.Entities.User> entities)
        {
            var listDto = new List<UserDto>();
            foreach (var entity in entities)
            {
                listDto.Add(Create(entity));
            }

            return listDto;
        }
    }
}