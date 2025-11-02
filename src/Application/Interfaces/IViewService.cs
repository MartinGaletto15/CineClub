using Application.Models;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IViewService
    {
        Task<IEnumerable<ViewDto>> GetAllAsync();
        Task<ViewDto> GetByIdAsync(int id);
        Task<ViewDto> CreateAsync(CreateViewRequest createRequest);
        Task<ViewDto> UpdateAsync(int id, UpdateViewRequest updateRequest);
        Task DeleteAsync(int id);
    }
}