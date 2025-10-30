namespace Application.Models.Requests
{
    public class CreateViewRequest
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public float Rating { get; set; }
        public DateTime DateFinish { get; set; }
    }
}