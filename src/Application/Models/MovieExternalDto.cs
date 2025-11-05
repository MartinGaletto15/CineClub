using System.Text.Json.Serialization;

namespace Application.Models
{
    public class MovieExternalDto
    {
        public string? Title { get; set; }
        public string? Year { get; set; }
        public string? Genre { get; set; }
        public string? Released { get; set; }
        public string? Runtime { get; set; }
        public string? Response { get; set; }
        public string? Actors { get; set; }
    }
}