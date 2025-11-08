using Application.Models;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IViewService
    {
        IEnumerable<ViewDto> GetAll();
        ViewDto GetById(int id);
        IEnumerable<ViewDto> GetByUserId(int userId);
        ViewDto Create(CreateViewRequest createRequest);
        ViewDto Update(int id, UpdateViewRequest updateRequest);
        void Delete(int id);
    }
}