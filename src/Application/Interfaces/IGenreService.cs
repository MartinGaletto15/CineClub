using Application.Dtos;
using Models.Requests;

namespace Application.Interfaces
{
    public interface IGenreService
    {
        IEnumerable<GenreDto> GetAllGenres();
        GenreDto GetGenreById(int id);
        GenreDto CreateGenre(CreateGenreRequest createRequest);
        GenreDto UpdateGenre(int id, UpdateGenreRequest updateRequest);
        void DeleteGenre(int id);
    }
}