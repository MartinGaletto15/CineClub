using System.ComponentModel.DataAnnotations;

namespace Models.Requests;

public record CreateGenreRequest(
    [Required]
    string Name
);