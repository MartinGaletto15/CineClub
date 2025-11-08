using Application.Models;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Application.Models.Requests;
using Domain.Exceptions;

namespace Application.Services
{
    public class ViewService : IViewService
    {
        private readonly IViewRepository _viewRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMovieRepository _movieRepository;

        public ViewService(IViewRepository viewRepository, IUserRepository userRepository, IMovieRepository movieRepository)
        {
            _viewRepository = viewRepository;
            _userRepository = userRepository;
            _movieRepository = movieRepository;
        }

        public IEnumerable<ViewDto> GetAll()
        {
            var views = _viewRepository.GetAll();
            return ViewDto.Create(views);
        }

        public ViewDto GetById(int id)
        {
            var view = _viewRepository.GetById(id)
                ?? throw new AppValidationException("Id de vista no encontrada");

            return ViewDto.Create(view);
        }
        
        public IEnumerable<ViewDto> GetByUserId(int userId)
        {
            var userExists = _userRepository.GetById(userId);
            if (userExists == null)
            {
                throw new AppValidationException($"El Usuario con ID {userId} no existe.");
            }

            var views = _viewRepository.GetViewsByUserId(userId);

            return ViewDto.Create(views);
        }

        public ViewDto Create(CreateViewRequest dto)
        {
            var userExists = _userRepository.GetById(dto.UserId);
            if (userExists == null)
            {
                throw new AppValidationException($"El Usuario con ID {dto.UserId} no existe.");
            }

            var movieExists = _movieRepository.GetById(dto.MovieId);
            if (movieExists == null)
            {
                throw new AppValidationException($"La Película con ID {dto.MovieId} no existe.");
            }
            else if (dto.Rating < 1 || dto.Rating > 5)
            {
                throw new AppValidationException($"El rating debe estar entre 1 y 5");
            }

            var view = new View
            {
                UserId = dto.UserId,
                MovieId = dto.MovieId,
                Rating = dto.Rating ?? 0,
                DateFinish = dto.DateFinish
            };

            _viewRepository.Add(view);
            return ViewDto.Create(view);
        }

        public ViewDto Update(int id, UpdateViewRequest dto)
        {
            var view = _viewRepository.GetById(id)
                         ?? throw new AppValidationException("ID de vista no encontrada");

            if (dto.MovieId.HasValue)
            {
                var movieExists = _movieRepository.GetById(dto.MovieId.Value);

                if (movieExists == null)
                {
                    throw new AppValidationException($"La Película con ID {dto.MovieId.Value} no existe.");
                }
            }

            if (dto.Rating < 1 || dto.Rating > 5)
            {
                throw new AppValidationException($"El rating debe estar entre 1 y 5");
            }

            view.MovieId = dto.MovieId ?? view.MovieId;
            view.Rating = dto.Rating ?? view.Rating;
            view.DateFinish = dto.DateFinish ?? view.DateFinish;

            _viewRepository.Update(view);
            return ViewDto.Create(view);
        }

        public void Delete(int id)
        {
            GetById(id);
            _viewRepository.Delete(id);
        }
    }
}