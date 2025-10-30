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
            var users = await _repository.GetAllAsync();
            return users.Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                LastName = u.LastName,
                Email = u.Email,
                Avatar = u.Avatar,
                Description = u.Description,
                Role = u.Role.ToString()
            });
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                Avatar = user.Avatar,
                Description = user.Description,
                Role = user.Role.ToString()
            };
        }

        public async Task<UserDto> CreateAsync(UserRequest request)
        {
            var user = new User
            {
                Name = request.Name,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                Avatar = request.Avatar,
                Description = request.Description,
                Role = Enum.Parse<UserRole>(request.Role)
            };

            await _repository.AddAsync(user);
            await _repository.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                Avatar = user.Avatar,
                Description = user.Description,
                Role = user.Role.ToString()
            };
        }

        public async Task<UserDto> UpdateAsync(int id, UserRequest request)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) throw new Exception("User not found");

            user.Name = request.Name;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.Password = request.Password;
            user.Avatar = request.Avatar;
            user.Description = request.Description;
            user.Role = Enum.Parse<UserRole>(request.Role);

            await _repository.UpdateAsync(user);
            await _repository.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                Avatar = user.Avatar,
                Description = user.Description,
                Role = user.Role.ToString()
            };
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