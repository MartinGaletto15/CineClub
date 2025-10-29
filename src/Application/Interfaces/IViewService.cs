using Application.DTOs;

namespace Application.Interfaces
{
    public interface IViewService
    {
        Task<IEnumerable<ViewDto>> GetAllAsync();
        Task<ViewDto> GetByIdAsync(int id);
        Task<ViewDto> CreateAsync(ViewDto dto);
        Task<ViewDto> UpdateAsync(ViewDto dto);
        Task DeleteAsync(int id);
    }
}