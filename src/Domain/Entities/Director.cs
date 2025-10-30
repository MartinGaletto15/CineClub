
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;
public class Director
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

}