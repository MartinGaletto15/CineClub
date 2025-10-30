using Application.Dtos;
using Models.Requests;

namespace Application.Interfaces
{
    public interface IGenreService
    {
        Task<IEnumerable<GenreDto>> GetAllGenresAsync();
        Task<GenreDto> GetGenreByIdAsync(int id);
        Task<GenreDto> CreateGenreAsync(CreateGenreRequest createRequest);
        Task<GenreDto> UpdateGenreAsync(int id, UpdateGenreRequest updateRequest);
        Task DeleteGenreAsync(int id);
    }
}