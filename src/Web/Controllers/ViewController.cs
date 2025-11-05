using Application.Models;
using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WebAPI.Controllers
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
        public async Task<IActionResult> GetAll()
        {
            var result = await _viewService.GetAllAsync();
            return Ok(result);
        }

        //VER UNA VISUALIZACIÓN - SOLO ADMIN / SUPERADMIN
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _viewService.GetByIdAsync(id);
            return Ok(result);
        }

        //REGISTRAR VISUALIZACIÓN - CUALQUIER USUARIO LOGUEADO
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateViewRequest dto)
        {
            //Obtiene el ID del usuario desde el token
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