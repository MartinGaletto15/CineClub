
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;
public class User
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required]
    [MaxLength(100)]
    public string LastName { get; set; }

    [Required]
    [MaxLength(100)]
    public string Email { get; set; }

    [Required]
    [MaxLength(100)]
    public string Password { get; set; }

    public string Avatar { get; set; }

    public string Description { get; set; }

    [Required]
    public UserRole Role { get; set; }

}