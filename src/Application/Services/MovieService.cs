using Application.Dtos;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Exceptions;
using Application.Models;

namespace Application.Services;

public class MovieService
{
    private readonly IMovieRepository _MovieRepository;

    public MovieService(IMovieRepository movieRepository)
    {
        _MovieRepository = movieRepository;
    }

    public MovieDto GetMovieById(int id)
    {
        var movie = _MovieRepository.GetById(id)
                ?? throw new AppValidationException("Pelicula no encontrada");
        return MovieDto.Create(movie);
    }

    public List<MovieDto> GetAllMovies()
    {
        var movies = _MovieRepository.GetAll()
                ?? throw new AppValidationException("No se encontraron peliculas");
        return MovieDto.Create(movies);
    }

    public Movie CreateMovie(string title, int DirectorId, int GenreId, DateOnly? releaseDate, decimal? duration, string? synopsis, string? poster)
    {
        var movie = _MovieRepository.Add(new Movie
        {
            Title = title,
            DirectorId = DirectorId,
            GenreId = GenreId,
            ReleaseDate = releaseDate ?? DateOnly.FromDateTime(DateTime.Now),
            Duration = duration ?? 0,
            Synopsis = synopsis,
            Poster = poster
        });

        return movie;
    }

    public MovieDto UpdateMovie(int id, int idDto, string title, int DirectorId, int GenreId, DateOnly? releaseDate, decimal? duration, string? synopsis, string? poster)
    {
        if (id != idDto)
        {
            throw new AppValidationException("Los IDs no coinciden");
        }

        var movie = _MovieRepository.GetById(id)
            ?? throw new AppValidationException("Pelicula no encontrada");

        movie.Title = title;
        movie.DirectorId = DirectorId;
        movie.GenreId = GenreId;
        movie.ReleaseDate = releaseDate ?? movie.ReleaseDate;
        movie.Duration = duration ?? movie.Duration;
        movie.Synopsis = synopsis ?? movie.Synopsis;
        movie.Poster = poster ?? movie.Poster;

        _MovieRepository.Update(movie);

        return MovieDto.Create(movie);
    }

    public void DeleteMovie(int id)
    {
        var movie = _MovieRepository.GetById(id)
            ?? throw new AppValidationException("Pelicula no encontrada");

        _MovieRepository.Delete(movie.Id);
    }
}
