namespace Application.Models.Requests
{
    public class UpdateViewRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public float Rating { get; set; }
        public DateTime DateFinish { get; set; }
    }
}