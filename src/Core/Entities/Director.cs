
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;
public class Director
{
    [Required]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

}