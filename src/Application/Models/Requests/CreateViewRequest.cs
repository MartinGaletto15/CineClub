using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class CreateViewRequest
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int MovieId { get; set; }
        public float? Rating { get; set; }
        public DateOnly? DateFinish { get; set; }
    }
}