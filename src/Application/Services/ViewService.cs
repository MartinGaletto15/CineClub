using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;

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
            var views = await _viewRepository.GetAllAsync();
            return views.Select(v => new ViewDto
            {
                Id = v.Id,
                UserId = v.UserId,
                MovieId = v.MovieId,
                Rating = v.Rating,
                DateFinish = v.DateFinish
            });
        }

        public async Task<ViewDto> GetByIdAsync(int id)
        {
            var v = await _viewRepository.GetByIdAsync(id);
            if (v == null) throw new Exception("View not found");
            return new ViewDto
            {
                Id = v.Id,
                UserId = v.UserId,
                MovieId = v.MovieId,
                Rating = v.Rating,
                DateFinish = v.DateFinish
            };
        }

        public async Task<ViewDto> CreateAsync(ViewDto dto)
        {
            var view = new View
            {
                UserId = dto.UserId,
                MovieId = dto.MovieId,
                Rating = dto.Rating,
                DateFinish = dto.DateFinish
            };
            await _viewRepository.AddAsync(view);
            return dto;
        }

        public async Task<ViewDto> UpdateAsync(ViewDto dto)
        {
            var view = await _viewRepository.GetByIdAsync(dto.Id);
            if (view == null) throw new Exception("View not found");

            view.Rating = dto.Rating;
            view.DateFinish = dto.DateFinish;

            await _viewRepository.UpdateAsync(view);
            return dto;
        }

        public async Task DeleteAsync(int id)
        {
            await _viewRepository.DeleteAsync(id);
        }
    }
}