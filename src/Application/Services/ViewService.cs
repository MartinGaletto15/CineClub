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

        public ViewService(IViewRepository viewRepository)
        {
            _viewRepository = viewRepository;
        }

        public async Task<IEnumerable<ViewDto>> GetAllAsync()
        {
            var views = await _viewRepository.GetAllAsync()
                    ?? throw new AppValidationException("No se encontraron peliculas");
            return ViewDto.Create(views);
        }

        public async Task<ViewDto> GetByIdAsync(int id)
        {
            var view = await _viewRepository.GetByIdAsync(id)
                ?? throw new AppValidationException("Pelicula no encontrada");
            return ViewDto.Create(view);
        }

        public async Task<ViewDto> CreateAsync(CreateViewRequest dto)
        {
            var view = new View
            {
                UserId = dto.UserId,
                MovieId = dto.MovieId,
                Rating = dto.Rating,
                DateFinish = dto.DateFinish
            };
            await _viewRepository.AddAsync(view);
            return ViewDto.Create(view);
        }

        public async Task<ViewDto> UpdateAsync(UpdateViewRequest dto)
        {
            var view = await _viewRepository.GetByIdAsync(dto.Id)
                    ?? throw new AppValidationException("Pelicula no encontrada");

            view.Rating = dto.Rating;
            view.DateFinish = dto.DateFinish;

            await _viewRepository.UpdateAsync(view);
            return ViewDto.Create(view);
        }

        public async Task DeleteAsync(int id)
        {
            await _viewRepository.DeleteAsync(id);
        }
    }
}