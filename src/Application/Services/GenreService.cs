using Application.Dtos;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Exceptions;
using Models.Requests;

namespace Application.Services
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepository;

        public GenreService(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        public async Task<IEnumerable<GenreDto>> GetAllGenresAsync()
        {
            var genres = await _genreRepository.GetAllAsync();
            return GenreDto.Create(genres);
        }

        public async Task<GenreDto> GetGenreByIdAsync(int id)
        {
            var genre = await _genreRepository.GetByIdAsync(id)
                ?? throw new AppValidationException("Género no encontrado");

            return GenreDto.Create(genre);
        }

        public async Task<GenreDto> CreateGenreAsync(CreateGenreRequest createRequest)
        {
            var genre = new Genre
            {
                Name = createRequest.Name
            };

            await _genreRepository.AddAsync(genre);

            return GenreDto.Create(genre);
        }

        public async Task<GenreDto> UpdateGenreAsync(int id, UpdateGenreRequest updateRequest)
        {

            var genre = await _genreRepository.GetByIdAsync(id)
                ?? throw new AppValidationException("Género no encontrado");

            genre.Name = updateRequest.Name;

            await _genreRepository.UpdateAsync(genre);

            return GenreDto.Create(genre);
        }

        public async Task DeleteGenreAsync(int id)
        {
            await GetGenreByIdAsync(id);
            await _genreRepository.DeleteAsync(id);
        }
    }
}