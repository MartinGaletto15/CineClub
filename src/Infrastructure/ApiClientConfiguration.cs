namespace Infrastructure
{
    public class ApiClientConfiguration
    {
        public int RetryCount { get; set; }
        public int retryAttemptInSeconds { get; set; }
        public int HandledEventsAllowedBeforeBreaking { get; set; }
        public int DurationOfBreakInSeconds { get; set; }
    }
}