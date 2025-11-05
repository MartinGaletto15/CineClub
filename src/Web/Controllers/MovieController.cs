using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Application.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        //VER UNA PELÍCULA (requiere estar autenticado)
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDto>> GetMovieById([FromRoute] int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            return Ok(movie);
        }

        //LISTAR PELÍCULAS (requiere estar autenticado)
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieDto>>> GetAllMovies()
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }

        //CREAR PELÍCULAS - SOLO Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public async Task<ActionResult<MovieDto>> CreateMovie([FromBody] CreateMovieRequest createMovieDto)
        {
            var movieDto = await _movieService.CreateMovieAsync(createMovieDto);
            return CreatedAtAction(nameof(GetMovieById), new { id = movieDto.id }, movieDto);
        }

        //ACTUALIZAR - SOLO Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public async Task<ActionResult<MovieDto>> UpdateMovie([FromRoute] int id, [FromBody] UpdateMovieRequest updateMovieDto)
        {
            var movie = await _movieService.UpdateMovieAsync(id, updateMovieDto);
            return Ok(movie);
        }

        //ELIMINAR - SOLO SuperAdmin
        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie([FromRoute] int id)
        {
            await _movieService.DeleteMovieAsync(id);
            return NoContent();
        }
    }
}