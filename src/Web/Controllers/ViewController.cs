using Application.Models;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Domain.Exceptions;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ViewController : ControllerBase
    {
        private readonly IViewService _viewService;
        // No necesitas IUserService si solo vas a verificar permisos
        // private readonly IUserService _UserService; 

        public ViewController(IViewService viewService)
        {
            _viewService = viewService;
        }

        //VER TODAS LAS VISUALIZACIONES - SOLO ADMIN / SUPERADMIN
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _viewService.GetAllAsync();
            return Ok(result);
        }

        //BUSCAR UNA VISUALIZACION (POR SU ID DE VISTA) - SOLO ADMIN / SUPERADMIN
        // NOTA: Cambié el nombre del método a GetById para que sea claro
        // y no entre en conflicto con el otro método.
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _viewService.GetByIdAsync(id);
            return Ok(result);
        }

        //BUSCAR TODAS LAS VISTAS ASOCIADAS A UN USUARIO PARTICULAR - CUALQUIER USUARIO
        [Authorize]
        [HttpGet("User/{userId}")]
        public async Task<IActionResult> GetViewsByUserId(int userId)
        {
            // Obtener el ID del usuario que hace la llamada
            var loggedInUserIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(loggedInUserIdClaim, out var loggedInUserId))
            {
                throw new AppValidationException("No se pudo identificar al usuario autenticado.");
            }

            var isAdmin = User.IsInRole("Admin") || User.IsInRole("SuperAdmin");

            // Validar permisos
            if (loggedInUserId != userId && !isAdmin)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new { message = "No tienes permisos para ver las visualizaciones de otro usuario." });
            }
            
            var result = await _viewService.GetByUserIdAsync(userId);
            return Ok(result);
        }

        //REGISTRAR VISUALIZACIÓN - CUALQUIER USUARIO LOGUEADO
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateViewRequest dto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("No se pudo identificar al usuario autenticado.");

            dto.UserId = userId;

            var result = await _viewService.CreateAsync(dto);
            return Ok(result);
        }

        //EDITAR VISUALIZACIÓN - SOLO ADMIN / SUPERADMIN
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateViewRequest dto)
        {
            var result = await _viewService.UpdateAsync(id, dto);
            return Ok(result);
        }

        //ELIMINAR VISUALIZACIÓN - SOLO SUPERADMIN
        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _viewService.DeleteAsync(id);
            return NoContent();
        }
    }
}