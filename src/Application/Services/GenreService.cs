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

        public IEnumerable<GenreDto> GetAllGenres()
        {
            var genres = _genreRepository.GetAll();
            return GenreDto.Create(genres);
        }

        public GenreDto GetGenreById(int id)
        {
            var genre = _genreRepository.GetById(id)
                ?? throw new AppValidationException("Género no encontrado");

            return GenreDto.Create(genre);
        }

        public GenreDto CreateGenre(CreateGenreRequest createRequest)
        {
            var genre = new Genre
            {
                Name = createRequest.Name
            };

            _genreRepository.Add(genre);

            return GenreDto.Create(genre);
        }

        public GenreDto UpdateGenre(int id, UpdateGenreRequest updateRequest)
        {

            var genre = _genreRepository.GetById(id)
                ?? throw new AppValidationException("Género no encontrado");

            genre.Name = updateRequest.Name;

            _genreRepository.Update(genre);

            return GenreDto.Create(genre);
        }

        public void DeleteGenre(int id)
        {
            // Verificamos que existe antes de borrar
            GetGenreById(id);
            _genreRepository.Delete(id);
        }
    }
}