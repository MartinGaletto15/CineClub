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

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<GenreDto> GetGenreById([FromRoute] int id)
        {
            var genre = _genreService.GetGenreById(id);
            return Ok(genre);
        }

        [Authorize]
        [HttpGet]
        public ActionResult<IEnumerable<GenreDto>> GetAllGenres()
        {
            var genres = _genreService.GetAllGenres();
            return Ok(genres);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public ActionResult<GenreDto> CreateGenre([FromBody] CreateGenreRequest createGenreDto)
        {
            var genreDto = _genreService.CreateGenre(createGenreDto);
            return CreatedAtAction(nameof(GetGenreById), new { id = genreDto.id }, genreDto);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public ActionResult<GenreDto> UpdateGenre([FromRoute] int id, [FromBody] UpdateGenreRequest updateGenreDto)
        {
            var genre = _genreService.UpdateGenre(id, updateGenreDto);
            return Ok(genre);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public ActionResult DeleteGenre([FromRoute] int id)
        {
            _genreService.DeleteGenre(id);
            return NoContent();
        }
    }
}