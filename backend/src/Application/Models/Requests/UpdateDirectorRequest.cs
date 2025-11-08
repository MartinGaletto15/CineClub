using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests;

public record UpdateDirectorRequest(

    [Required]
    string Name
);
