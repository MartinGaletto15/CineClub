using Application.Dtos;
using Application.Interfaces;
using Application.Models.Requests;
using Domain.Entities;
using Domain.Interfaces;
using Domain.Exceptions;

namespace Application.Services
{
    public class DirectorService : IDirectorService
    {
        private readonly IDirectorRepository _directorRepository;

        public DirectorService(IDirectorRepository directorRepository)
        {
            _directorRepository = directorRepository;
        }

        public async Task<IEnumerable<DirectorDto>> GetAllDirectorsAsync()
        {
            var directors = await _directorRepository.GetAllAsync();
            return directors.Select(DirectorDto.Create);
        }

        public async Task<DirectorDto> GetDirectorByIdAsync(int id)
        {
            var director = await _directorRepository.GetByIdAsync(id)
                    ?? throw new AppValidationException("Director no encontrado");

            return DirectorDto.Create(director);
        }

        public async Task<DirectorDto> CreateDirectorAsync(CreateDirectorRequest createRequest)
        {
            var director = new Director
            {
                Name = createRequest.Name
            };

            await _directorRepository.AddAsync(director);

            return DirectorDto.Create(director);
        }

        public async Task<DirectorDto> UpdateDirectorAsync(int id, UpdateDirectorRequest updateRequest)
        {
            if (id != updateRequest.Id)
            {
                throw new AppValidationException("Los IDs de la ruta y del cuerpo no coinciden");
            }

            var director = await _directorRepository.GetByIdAsync(id)
                    ?? throw new AppValidationException("Director no encontrado");

            director.Name = updateRequest.Name;

            await _directorRepository.UpdateAsync(director);

            return DirectorDto.Create(director);
        }

        public async Task DeleteDirectorAsync(int id)
        {
            await _directorRepository.DeleteAsync(id);
        }
    }
}