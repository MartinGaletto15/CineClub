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
        [HttpGet("{id}")]
        public ActionResult<DirectorDto> GetDirectorById([FromRoute] int id)
        {
            var director = _directorService.GetDirectorById(id);
            return Ok(director);
        }

        //LISTAR DIRECTORES - Cualquier persona
        [HttpGet]
        public ActionResult<IEnumerable<DirectorDto>> GetAllDirectors()
        {
            var directors = _directorService.GetAllDirectors();
            return Ok(directors);
        }

        //CREAR - Solo Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public ActionResult<DirectorDto> CreateDirector([FromBody] CreateDirectorRequest createDirectorDto)
        {
            var directorDto = _directorService.CreateDirector(createDirectorDto);
            return CreatedAtAction(nameof(GetDirectorById), new { id = directorDto.id }, directorDto);
        }

        //EDITAR - Solo Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public ActionResult<DirectorDto> UpdateDirector([FromRoute] int id, [FromBody] UpdateDirectorRequest updateDirectorDto)
        {
            var director = _directorService.UpdateDirector(id, updateDirectorDto);
            return Ok(director);
        }

        //ELIMINAR - Solo SuperAdmin
        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public ActionResult DeleteDirector([FromRoute] int id)
        {
            _directorService.DeleteDirector(id);
            return NoContent();
        }
    }
}