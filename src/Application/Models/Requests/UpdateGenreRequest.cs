using System.ComponentModel.DataAnnotations;


namespace Models.Requests;

public record UpdateGenreRequest(
    [Required]
    string Name
);