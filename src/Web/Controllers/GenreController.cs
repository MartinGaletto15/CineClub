using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Dtos;
using Models.Requests;

namespace Web.Controllers
{
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet("api/genres/{id}")]
        public async Task<ActionResult<GenreDto>> GetGenreById([FromRoute] int id)
        {
            var genre = await _genreService.GetGenreByIdAsync(id);
            return Ok(genre);
        }

        [HttpGet("api/genres")]
        public async Task<ActionResult<IEnumerable<GenreDto>>> GetAllGenres()
        {
            var genres = await _genreService.GetAllGenresAsync();
            return Ok(genres);
        }

        [HttpPost("api/genres")]
        public async Task<ActionResult<GenreDto>> CreateGenre([FromBody] CreateGenreRequest createGenreDto)
        {
            var genreDto = await _genreService.CreateGenreAsync(createGenreDto);
            return CreatedAtAction(nameof(GetGenreById), new { id = genreDto.id }, genreDto);
        }

        [HttpPut("api/genres/{id}")]
        public async Task<ActionResult<GenreDto>> UpdateGenre([FromRoute] int id, [FromBody] UpdateGenreRequest updateGenreDto)
        {
            var genre = await _genreService.UpdateGenreAsync(id, updateGenreDto);
            return Ok(genre);
        }

        [HttpDelete("api/genres/{id}")]
        public async Task<ActionResult> DeleteGenre([FromRoute] int id)
        {
            await _genreService.DeleteGenreAsync(id);
            return NoContent();
        }
    }
}