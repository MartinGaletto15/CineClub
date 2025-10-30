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

        public MovieService(IMovieRepository movieRepository)
        {
            _MovieRepository = movieRepository;
        }

        public async Task<MovieDto> GetMovieByIdAsync(int id)
        {
            var movie = await _MovieRepository.GetByIdAsync(id)
                    ?? throw new AppValidationException("Pelicula no encontrada");

            return MovieDto.Create(movie);
        }

        public async Task<IEnumerable<MovieDto>> GetAllMoviesAsync()
        {
            var movies = await _MovieRepository.GetAllAsync();
            if (movies == null || !movies.Any())
            {
                return new List<MovieDto>();
            }
            return MovieDto.Create(movies);
        }

        public async Task<MovieDto> CreateMovieAsync(CreateMovieRequest createRequest)
        {
            var movie = new Movie
            {
                Title = createRequest.Title,
                DirectorId = createRequest.DirectorId,
                GenreId = createRequest.GenreId,
                ReleaseDate = createRequest.ReleaseDate ?? DateOnly.FromDateTime(DateTime.Now),
                Duration = createRequest.Duration ?? 0,
                Synopsis = createRequest.Synopsis,
                Poster = createRequest.Poster
            };

            await _MovieRepository.AddAsync(movie);

            // 🔹 Volvemos a traer la película con sus relaciones incluidas (usando el método que ya tenés)
            var movieWithRelations = await _MovieRepository.GetByIdAsync(movie.Id);

            return MovieDto.Create(movieWithRelations!);
        }
        public async Task<MovieDto> UpdateMovieAsync(int id, UpdateMovieRequest updateRequest)
        {
            if (id != updateRequest.Id)
            {
                throw new AppValidationException("Los IDs de la ruta y del cuerpo no coinciden");
            }

            var movie = await _MovieRepository.GetByIdAsync(id)
                ?? throw new AppValidationException("Pelicula no encontrada");

            movie.Title = updateRequest.Title;
            movie.DirectorId = updateRequest.DirectorId;
            movie.GenreId = updateRequest.GenreId;
            movie.ReleaseDate = updateRequest.ReleaseDate ?? movie.ReleaseDate;
            movie.Duration = updateRequest.Duration ?? movie.Duration;
            movie.Synopsis = updateRequest.Synopsis ?? movie.Synopsis;
            movie.Poster = updateRequest.Poster ?? movie.Poster;

            await _MovieRepository.UpdateAsync(movie);

            return MovieDto.Create(movie);
        }

        public async Task DeleteMovieAsync(int id)
        {
            await _MovieRepository.DeleteAsync(id);
        }
    }
}