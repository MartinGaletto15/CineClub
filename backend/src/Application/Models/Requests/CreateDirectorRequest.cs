using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests;

public record CreateDirectorRequest(

    [Required]
    string Name
);

