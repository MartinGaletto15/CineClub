using Domain.Entities;

namespace Domain.Interfaces;

public interface IMovieRepository
{
    Movie? GetById(int id);

    List<Movie>? GetAll();

    Movie Add(Movie movie);

    Movie Update(Movie movie);

    void Delete(int id);
}