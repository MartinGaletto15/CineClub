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

        public async Task<IEnumerable<ViewDto>> GetAllAsync()
        {
            var views = await _viewRepository.GetAllAsync();
            return ViewDto.Create(views);
        }

        public async Task<ViewDto> GetByIdAsync(int id)
        {
            var view = await _viewRepository.GetByIdAsync(id)
                ?? throw new AppValidationException("Id de vista no encontrada");
            return ViewDto.Create(view);
        }

        public async Task<ViewDto> CreateAsync(CreateViewRequest dto)
        {

            var userExists = await _userRepository.GetByIdAsync(dto.UserId);
            if (userExists == null)
            {
                throw new AppValidationException($"El Usuario con ID {dto.UserId} no existe.");
            }

            var movieExists = await _movieRepository.GetByIdAsync(dto.MovieId);
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

            await _viewRepository.AddAsync(view);
            return ViewDto.Create(view);
        }

        public async Task<ViewDto> UpdateAsync(int id, UpdateViewRequest dto)
        {
            var view = await _viewRepository.GetByIdAsync(id)
                    ?? throw new AppValidationException("ID de vista no encontrada");

            if (dto.MovieId.HasValue)
            {
                var movieExists = await _movieRepository.GetByIdAsync(dto.MovieId.Value);

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

            await _viewRepository.UpdateAsync(view);
            return ViewDto.Create(view);
        }

        public async Task DeleteAsync(int id)
        {
            await GetByIdAsync(id);
            await _viewRepository.DeleteAsync(id);
        }
    }
}