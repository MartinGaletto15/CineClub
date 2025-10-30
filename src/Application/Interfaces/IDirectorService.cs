using Application.Dtos;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IDirectorService
    {
        Task<IEnumerable<DirectorDto>> GetAllDirectorsAsync();
        Task<DirectorDto> GetDirectorByIdAsync(int id);
        Task<DirectorDto> CreateDirectorAsync(CreateDirectorRequest createRequest);
        Task<DirectorDto> UpdateDirectorAsync(int id, UpdateDirectorRequest updateRequest);
        Task DeleteDirectorAsync(int id);
    }
}