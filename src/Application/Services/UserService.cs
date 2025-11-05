using Application.Interfaces;
using Application.Models;
using Application.Models.Requests;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
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

                //se fija como User por defecto
                Role = UserRole.User
            };

            await _repository.AddAsync(user);
            await _repository.SaveChangesAsync();

            return UserDto.Create(user);
        }


        public async Task<UserDto> UpdateAsync(int id, UpdateUserRequest request)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) throw new Exception("User not found");

            user.Name = request.Name ?? user.Name;
            user.LastName = request.LastName ?? user.LastName;
            user.Password = request.Password ?? user.Password;
            user.Avatar = request.Avatar ?? user.Avatar;
            user.Description = request.Description ?? user.Description;
            user.Role = request.Role ?? user.Role;

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

        public async Task<string> LoginAsync(UserLoginRequest request)
        {
            var user = await _repository.GetByEmailAsync(request.Email);

            if (user == null || user.Password != request.Password)
                throw new Exception("Credenciales inválidas");

            var secret = _configuration["JwtSettings:Secret"]
                ?? throw new Exception("No se encontró la clave JWT. Configurá JwtSettings:Secret.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddHours(4),
                signingCredentials: creds,
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}