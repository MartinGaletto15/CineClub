using Application.Models;
using Application.Models.Requests;

namespace Application.Interfaces
{
    public interface IUserService
    {
        IEnumerable<UserDto> GetAll();
        UserDto? GetById(int id);
        UserDto Create(CreateUserRequest request);
        UserDto Update(int id, UpdateUserRequest request);
        bool Delete(int id);
        string Login(UserLoginRequest request); //Método de login en IUserService
    }
}