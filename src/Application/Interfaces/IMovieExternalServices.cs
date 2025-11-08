using Application.Models;

namespace Application.Interfaces
{
    public interface IMovieExternalService
    {
        Task<MovieExternalDto?> SearchMovieAsync(string title);
    }
}
