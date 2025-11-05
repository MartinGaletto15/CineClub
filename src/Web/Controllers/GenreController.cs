using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Dtos;
using Models.Requests;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/genres")]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        //LISTAR Y OBTENER — Cualquier usuario autenticado
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDto>> GetGenreById([FromRoute] int id)
        {
            var genre = await _genreService.GetGenreByIdAsync(id);
            return Ok(genre);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GenreDto>>> GetAllGenres()
        {
            var genres = await _genreService.GetAllGenresAsync();
            return Ok(genres);
        }

        //CREAR — Solo Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult<GenreDto>> CreateGenre([FromBody] CreateGenreRequest createGenreDto)
        {
            var genreDto = await _genreService.CreateGenreAsync(createGenreDto);
            return CreatedAtAction(nameof(GetGenreById), new { id = genreDto.id }, genreDto);
        }

        //MODIFICAR — Solo Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<GenreDto>> UpdateGenre([FromRoute] int id, [FromBody] UpdateGenreRequest updateGenreDto)
        {
            var genre = await _genreService.UpdateGenreAsync(id, updateGenreDto);
            return Ok(genre);
        }

        //ELIMINAR — Solo SuperAdmin
        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGenre([FromRoute] int id)
        {
            await _genreService.DeleteGenreAsync(id);
            return NoContent();
        }
    }
}