using Application.Interfaces;
using Application.Models;
using Application.Models.Requests;
using Domain.Entities;
using Domain.Exceptions;
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

        public IEnumerable<UserDto> GetAll()
        {
            var users = _repository.GetAll()
                           ?? throw new AppValidationException("Usuarios no encontrados");

            return UserDto.Create(users);
        }

        public UserDto? GetById(int id)
        {
            var user = _repository.GetById(id)
                           ?? throw new AppValidationException("Usuario no encontrado");

            return UserDto.Create(user);
        }

        public UserDto Create(CreateUserRequest request)
        {
            var user = new User
            {
                Name = request.Name,
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                Avatar = request.Avatar,
                Description = request.Description,
                Role = UserRole.User //se fija como User por defecto
            };

            _repository.Add(user);

            return UserDto.Create(user);
        }

        public UserDto Update(int id, UpdateUserRequest request)
        {
            var user = _repository.GetById(id)
                           ?? throw new AppValidationException("Usuario no encontrado");

            user.Name = request.Name ?? user.Name;
            user.LastName = request.LastName ?? user.LastName;
            user.Password = request.Password ?? user.Password;
            user.Avatar = request.Avatar ?? user.Avatar;
            user.Description = request.Description ?? user.Description;
            user.Role = request.Role ?? user.Role;

            _repository.Update(user);

            return UserDto.Create(user);
        }

        public bool Delete(int id)
        {
            // Verificamos que existe
            GetById(id);
            _repository.Delete(id);
            return true;
        }

        public string Login(UserLoginRequest request)
        {
            var user = _repository.GetByEmail(request.Email);

            if (user == null || user.Password != request.Password)
                throw new AppValidationException("Credenciales inválidas");

            var secret = _configuration["JwtSettings:Secret"]
                         ?? throw new AppValidationException("No se encontró la clave JWT.");

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