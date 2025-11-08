using Application.Dtos;
using Application.Interfaces;
using Application.Models.Requests;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Exceptions;

namespace Application.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _MovieRepository;
        private readonly IGenreRepository _genreRepository;
        private readonly IDirectorRepository _directorRepository;

        public MovieService(IMovieRepository movieRepository, IGenreRepository genreRepository, IDirectorRepository directorRepository)
        {
            _MovieRepository = movieRepository;
            _genreRepository = genreRepository;
            _directorRepository = directorRepository;
        }

        public MovieDto GetMovieById(int id)
        {
            var movie = _MovieRepository.GetById(id)
                           ?? throw new AppValidationException("Pelicula no encontrada");

            return MovieDto.Create(movie);
        }

        public IEnumerable<MovieDto> GetAllMovies()
        {
            var movies = _MovieRepository.GetAll();
            if (movies == null || !movies.Any())
            {
                return new List<MovieDto>();
            }
            return MovieDto.Create(movies);
        }

        public MovieDto CreateMovie(CreateMovieRequest createRequest)
        {
            var director = _directorRepository.GetById(createRequest.DirectorId);
            if (director == null)
            {
                throw new AppValidationException($"El Director con ID {createRequest.DirectorId} no existe.");
            }

            var movie = new Movie
            {
                Title = createRequest.Title,
                DirectorId = createRequest.DirectorId,
                ReleaseDate = createRequest.ReleaseDate,
                Duration = createRequest.Duration,
                Synopsis = createRequest.Synopsis,
                Poster = createRequest.Poster
            };

            if (createRequest.GenreIds != null && createRequest.GenreIds.Any())
            {
                // Buscamos las entidades Genre que coincidan con los IDs
                var genres = _genreRepository.Find(g => createRequest.GenreIds.Contains(g.Id));

                // Asignamos las entidades a la navegación
                movie.Genres = genres.ToList();
            }

            _MovieRepository.Add(movie);

            // Recargamos la entidad para que incluya las relaciones (Director y Genres)
            var movieWithRelations = _MovieRepository.GetById(movie.Id);

            return MovieDto.Create(movieWithRelations!);
        }

        public MovieDto UpdateMovie(int id, UpdateMovieRequest updateRequest)
        {
            var movie = _MovieRepository.GetById(id)
                           ?? throw new AppValidationException("Pelicula no encontrada");

            movie.Title = updateRequest.Title ?? movie.Title;
            movie.DirectorId = updateRequest.DirectorId ?? movie.DirectorId;
            movie.ReleaseDate = updateRequest.ReleaseDate ?? movie.ReleaseDate;
            movie.Duration = updateRequest.Duration ?? movie.Duration;
            movie.Synopsis = updateRequest.Synopsis ?? movie.Synopsis;
            movie.Poster = updateRequest.Poster ?? movie.Poster;

            if (updateRequest.GenreIds != null)
            {
                var newGenres = _genreRepository.Find(g => updateRequest.GenreIds.Contains(g.Id));
                
                var requestedIdsCount = updateRequest.GenreIds.Distinct().Count();
                
                if (newGenres.Count() != requestedIdsCount)
                {
                    throw new AppValidationException($"Uno o mas generos no validos");
                }

                movie.Genres = newGenres.ToList();
            }

            _MovieRepository.Update(movie);

            var movieActualizada = _MovieRepository.GetById(id);

            return MovieDto.Create(movieActualizada!);
        }

        public void DeleteMovie(int id)
        {
            // Verificamos que existe
            GetMovieById(id);
            _MovieRepository.Delete(id);
        }
    }
}