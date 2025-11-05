using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/directors")]
    public class DirectorController : ControllerBase
    {
        private readonly IDirectorService _directorService;

        public DirectorController(IDirectorService directorService)
        {
            _directorService = directorService;
        }

        //VER UN DIRECTOR - Cualquier usuario autenticado
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<DirectorDto>> GetDirectorById([FromRoute] int id)
        {
            var director = await _directorService.GetDirectorByIdAsync(id);
            return Ok(director);
        }

        //LISTAR DIRECTORES - Cualquier usuario autenticado
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DirectorDto>>> GetAllDirectors()
        {
            var directors = await _directorService.GetAllDirectorsAsync();
            return Ok(directors);
        }

        //CREAR - Solo Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult<DirectorDto>> CreateDirector([FromBody] CreateDirectorRequest createDirectorDto)
        {
            var directorDto = await _directorService.CreateDirectorAsync(createDirectorDto);
            return CreatedAtAction(nameof(GetDirectorById), new { id = directorDto.id }, directorDto);
        }

        //EDITAR - Solo Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<DirectorDto>> UpdateDirector([FromRoute] int id, [FromBody] UpdateDirectorRequest updateDirectorDto)
        {
            var director = await _directorService.UpdateDirectorAsync(id, updateDirectorDto);
            return Ok(director);
        }

        //ELIMINAR - Solo SuperAdmin
        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDirector([FromRoute] int id)
        {
            await _directorService.DeleteDirectorAsync(id);
            return NoContent();
        }
    }
}