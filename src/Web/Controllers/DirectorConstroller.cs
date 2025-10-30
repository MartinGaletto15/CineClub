using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Application.Dtos;

namespace Web.Controllers
{
    [ApiController]
    public class DirectorController : ControllerBase
    {
        private readonly IDirectorService _directorService;

        public DirectorController(IDirectorService directorService)
        {
            _directorService = directorService;
        }

        [HttpGet("api/directors/{id}")]
        public async Task<ActionResult<DirectorDto>> GetDirectorById([FromRoute] int id)
        {
            var director = await _directorService.GetDirectorByIdAsync(id);
            return Ok(director);
        }

        [HttpGet("api/directors")]
        public async Task<ActionResult<IEnumerable<DirectorDto>>> GetAllDirectors()
        {
            var directors = await _directorService.GetAllDirectorsAsync();
            return Ok(directors);
        }

        [HttpPost("api/directors")]
        public async Task<ActionResult<DirectorDto>> CreateDirector([FromBody] CreateDirectorRequest createDirectorDto)
        {
            var directorDto = await _directorService.CreateDirectorAsync(createDirectorDto);
            return CreatedAtAction(nameof(GetDirectorById), new { id = directorDto.id }, directorDto);
        }

        [HttpPut("api/directors/{id}")]
        public async Task<ActionResult<DirectorDto>> UpdateDirector([FromRoute] int id, [FromBody] UpdateDirectorRequest updateDirectorDto)
        {
            var director = await _directorService.UpdateDirectorAsync(id, updateDirectorDto);
            return Ok(director);
        }

        [HttpDelete("api/directors/{id}")]
        public async Task<ActionResult> DeleteDirector([FromRoute] int id)
        {
            await _directorService.DeleteDirectorAsync(id);
            return NoContent();
        }
    }
}