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
                Rating = dto.Rating?? 0,
                DateFinish = dto.DateFinish?? DateTime.Now
            };
            await _viewRepository.AddAsync(view);
            return ViewDto.Create(view);
        }

        public async Task<ViewDto> UpdateAsync(int id, UpdateViewRequest dto)
        {
            var view = await _viewRepository.GetByIdAsync(id)
                    ?? throw new AppValidationException("Pelicula no encontrada");

            view.MovieId = dto.MovieId?? view.MovieId;
            view.Rating = dto.Rating?? view.Rating;
            view.DateFinish = dto.DateFinish?? view.DateFinish;

            await _viewRepository.UpdateAsync(view);
            return ViewDto.Create(view);
        }

        public async Task DeleteAsync(int id)
        {
            await _viewRepository.DeleteAsync(id);
        }
    }
}