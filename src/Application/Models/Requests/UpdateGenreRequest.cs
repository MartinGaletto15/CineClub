using System.ComponentModel.DataAnnotations;


namespace Models.Requests;

public record UpdateGenreRequest(
    [Required]
    int Id,

    [Required]
    string Name
);