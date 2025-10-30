using Application.Models;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<UserDto?> GetByIdAsync(int id);
        Task<UserDto> CreateAsync(UserRequest request);
        Task<UserDto> UpdateAsync(int id, UserRequest request);
        Task<bool> DeleteAsync(int id);
    }
}