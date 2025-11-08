using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class User
    {
        [Required]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        public string Avatar { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Required]
        public UserRole Role { get; set; }

        public virtual ICollection<View> Views { get; set; } = new List<View>();
    }
}