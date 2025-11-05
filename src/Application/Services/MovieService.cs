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

            var director = await _directorRepository.GetByIdAsync(createRequest.DirectorId);
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
                // La propiedad movie.Genres se inicializa como una lista vacía
            };

            // Logica M:N
            if (createRequest.GenreIds != null && createRequest.GenreIds.Any())
            {
                // Buscamos las entidades Genre que coincidan con los IDs
                var genres = await _genreRepository.FindAsync(g => createRequest.GenreIds.Contains(g.Id));

                // Asignamos las entidades a la navegación
                movie.Genres = genres.ToList();
            }

            await _MovieRepository.AddAsync(movie);

            var movieWithRelations = await _MovieRepository.GetByIdAsync(movie.Id);

            return MovieDto.Create(movieWithRelations!);
        }

        public async Task<MovieDto> UpdateMovieAsync(int id, UpdateMovieRequest updateRequest)
        {
            var movie = await _MovieRepository.GetByIdAsync(id)
                    ?? throw new AppValidationException("Pelicula no encontrada");

            movie.Title = updateRequest.Title ?? movie.Title;
            movie.DirectorId = updateRequest.DirectorId ?? movie.DirectorId;
            movie.ReleaseDate = updateRequest.ReleaseDate ?? movie.ReleaseDate;
            movie.Duration = updateRequest.Duration ?? movie.Duration;
            movie.Synopsis = updateRequest.Synopsis ?? movie.Synopsis;
            movie.Poster = updateRequest.Poster ?? movie.Poster;

            // Lógica M:N
            if (updateRequest.GenreIds != null)
            {
                var newGenres = await _genreRepository.FindAsync(g => updateRequest.GenreIds.Contains(g.Id));

                var requestedIdsCount = updateRequest.GenreIds.Distinct().Count();

                if (newGenres.Count() != requestedIdsCount)
                {
                    throw new AppValidationException($"Uno o mas generos no validos");
                }

                movie.Genres = newGenres.ToList();
            }

            await _MovieRepository.UpdateAsync(movie);

            var movieActualizada = await _MovieRepository.GetByIdAsync(id);

            return MovieDto.Create(movieActualizada!);
        }

        public async Task DeleteMovieAsync(int id)
        {
            await GetMovieByIdAsync(id);
            await _MovieRepository.DeleteAsync(id);
        }
    }
}