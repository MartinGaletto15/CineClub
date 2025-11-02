using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.Models.Requests
{
    public class CreateUserRequest
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MinLength(6)]
        public string Password { get; set; } = string.Empty;

        public string Avatar { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Required]
        public UserRole Role { get; set; } = UserRole.User;
    }
}