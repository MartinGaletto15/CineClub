using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class Genre
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

}