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

        public IEnumerable<DirectorDto> GetAllDirectors()
        {
            var directors = _directorRepository.GetAll();
            return directors.Select(DirectorDto.Create);
        }

        public DirectorDto GetDirectorById(int id)
        {
            var director = _directorRepository.GetById(id)
                           ?? throw new AppValidationException("Director no encontrado");

            return DirectorDto.Create(director);
        }

        public DirectorDto CreateDirector(CreateDirectorRequest createRequest)
        {
            var director = new Director
            {
                Name = createRequest.Name
            };

            _directorRepository.Add(director);

            return DirectorDto.Create(director);
        }

        public DirectorDto UpdateDirector(int id, UpdateDirectorRequest updateRequest)
        {
            var director = _directorRepository.GetById(id)
                           ?? throw new AppValidationException("Director no encontrado");

            director.Name = updateRequest.Name;

            _directorRepository.Update(director);

            return DirectorDto.Create(director);
        }

        public void DeleteDirector(int id)
        {
            GetDirectorById(id); 
            
            _directorRepository.Delete(id);
        }
    }
}