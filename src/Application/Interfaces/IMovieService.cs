using Application.Dtos;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDto>> GetAllMoviesAsync();
        Task<MovieDto> GetMovieByIdAsync(int id);
        Task<MovieDto> CreateMovieAsync(CreateMovieRequest createRequest);
        
        Task<MovieDto> UpdateMovieAsync(int id, UpdateMovieRequest updateRequest);
        
        Task DeleteMovieAsync(int id);
    }
}