namespace Application.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}