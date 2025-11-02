using Application.Interfaces;
using Application.Models;
using Application.Models.Requests;
using Domain.Entities;
using Domain.Interfaces;


namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _repository.GetAllAsync()
                    ?? throw new Exception("Usuarios no encontrados");

            return UserDto.Create(users);
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) return null;

            return UserDto.Create(user);
        }

        public async Task<UserDto> CreateAsync(CreateUserRequest request)
        {
            var user = new User
            {
                Name = request.Name,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                Avatar = request.Avatar,
                Description = request.Description,
                Role = request.Role
            };

            await _repository.AddAsync(user);
            await _repository.SaveChangesAsync();

            return UserDto.Create(user);
        }

        public async Task<UserDto> UpdateAsync(int id, UpdateUserRequest request)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) throw new Exception("User not found");

            user.Name = request.Name?? user.Name;
            user.LastName = request.LastName?? user.LastName;
            user.Password = request.Password?? user.Password;
            user.Avatar = request.Avatar?? user.Avatar;
            user.Description = request.Description?? user.Description;
            user.Role = request.Role?? user.Role;

            await _repository.UpdateAsync(user);
            await _repository.SaveChangesAsync();

            return UserDto.Create(user);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) return false;

            await _repository.DeleteAsync(user.Id);
            await _repository.SaveChangesAsync();
            return true;
        }
    }
}