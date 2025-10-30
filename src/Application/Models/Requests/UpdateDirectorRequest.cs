using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests;

public record UpdateDirectorRequest(
    [Required]
    int Id,

    [Required]
    string Name
);
