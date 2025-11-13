using Application.Models;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Domain.Exceptions;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ViewController : ControllerBase
    {
        private readonly IViewService _viewService;

        public ViewController(IViewService viewService)
        {
            _viewService = viewService;
        }

        //VER TODAS LAS VISUALIZACIONES - SOLO ADMIN / SUPERADMIN
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _viewService.GetAll();
            return Ok(result);
        }

        //BUSCAR UNA VISUALIZACION (POR SU ID DE VISTA) - SOLO ADMIN / SUPERADMIN
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _viewService.GetById(id);
            return Ok(result);
        }

        //BUSCAR TODAS LAS VISTAS ASOCIADAS A UN USUARIO PARTICULAR - CUALQUIER USUARIO
        [Authorize]
        [HttpGet("User/{userId}")]
        public IActionResult GetViewsByUserId(int userId)
        {
            // Obtener el ID del usuario que hace la llamada
            var loggedInUserIdClaim = User.FindFirstValue("id");
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
            
            var result = _viewService.GetByUserId(userId);
            return Ok(result);
        }

        //REGISTRAR VISUALIZACIÓN - CUALQUIER USUARIO LOGUEADO
        [Authorize]
        [HttpPost]
        public IActionResult Create(CreateViewRequest dto)
        {
            var userIdClaim = User.FindFirstValue("id");

            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized("No se pudo identificar al usuario autenticado.");

            dto.UserId = userId;

            var result = _viewService.Create(dto);
            return Ok(result);
        }

        //EDITAR VISUALIZACIÓN - TODOS
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateViewRequest dto)
        {
            var result = _viewService.Update(id, dto);
            return Ok(result);
        }

        //ELIMINAR VISUALIZACIÓN - TODOS
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _viewService.Delete(id);
            return NoContent();
        }
    }
}
