using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Domain.Exceptions;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Todos requieren estar logueados
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        //SOLO ADMIN / SUPERADMIN PUEDEN VER TODOS LOS USUARIOS
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _service.GetAll();
            return Ok(users);
        }

        //CUALQUIER USUARIO AUTENTICADO PUEDE VER SU PROPIO PERFIL
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var currentUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var currentUserRole = User.FindFirstValue(ClaimTypes.Role);

            //Si es User, solo puede ver su propio perfil
            if (currentUserRole == "User" && id != currentUserId)
                throw new AppValidationException("No tienes permisos para ver otros usuarios.");

            var user = _service.GetById(id);
            if (user == null) return NotFound("User not found");

            return Ok(user);
        }
    }
}