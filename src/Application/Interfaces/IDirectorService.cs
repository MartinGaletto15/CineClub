using Application.Dtos;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IDirectorService
    {
        IEnumerable<DirectorDto> GetAllDirectors();
        DirectorDto GetDirectorById(int id);
        DirectorDto CreateDirector(CreateDirectorRequest createRequest);
        DirectorDto UpdateDirector(int id, UpdateDirectorRequest updateRequest);
        void DeleteDirector(int id);
    }
}