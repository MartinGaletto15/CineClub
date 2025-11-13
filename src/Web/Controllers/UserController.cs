using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Domain.Exceptions;
using Application.Models.Requests;

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
            var currentUserId = int.Parse(User.FindFirstValue("id")!);
            var currentUserRole = User.FindFirstValue("role");

            //Si es User, solo puede ver su propio perfil
            if (currentUserRole == "User" && id != currentUserId)
                throw new AppValidationException("No tienes permisos para ver otros usuarios.");

            var user = _service.GetById(id);
            if (user == null) return NotFound("User not found");

            return Ok(user);
        }

        [HttpGet("me")]
        public IActionResult GetMyProfile()
        {
            var currentUserId = int.Parse(User.FindFirstValue("id")!);
            var user = _service.GetById(currentUserId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado (token inválido o expirado)");
            }

            return Ok(user);
        }

        [HttpPut("me")]
        public IActionResult UpdateMyProfile([FromBody] UpdateUserRequest dto)
        {
            var currentUserId = int.Parse(User.FindFirstValue("id")!);

            try
            {
                var updatedUser = _service.Update(currentUserId, dto);
                return Ok(updatedUser);
            }
            catch (AppValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocurrió un error al actualizar el perfil");
            }
        }

        [HttpDelete("me")]
        public IActionResult DeleteMyAccount()
        {
            var currentUserId = int.Parse(User.FindFirstValue("id")!);

            try
            {
                _service.Delete(currentUserId);
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocurrió un error al eliminar la cuenta");
            }
        }
    }
}