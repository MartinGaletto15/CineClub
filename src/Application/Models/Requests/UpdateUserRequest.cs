using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Application.Models.Requests
{
    public class UpdateUserRequest
    {
        public string? Name { get; set; }

        public string? LastName { get; set; }

        [MinLength(6)]
        public string? Password { get; set; }

        public string? Avatar { get; set; }
        public string? Description { get; set; }

        public UserRole? Role { get; set; }
    }
}