using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class UpdateViewRequest
    {
        public int? MovieId { get; set; }
        public float? Rating { get; set; }
        public DateOnly? DateFinish { get; set; }
    }
}