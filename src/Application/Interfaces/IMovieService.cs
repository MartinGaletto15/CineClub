using Application.Dtos;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IMovieService
    {
        IEnumerable<MovieDto> GetAllMovies();
        MovieDto GetMovieById(int id);
        MovieDto CreateMovie(CreateMovieRequest createRequest);
        MovieDto UpdateMovie(int id, UpdateMovieRequest updateRequest);
        void DeleteMovie(int id);
    }
}