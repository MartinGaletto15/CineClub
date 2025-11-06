using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Application.Dtos;
using Domain.Exceptions;
using System.Timers;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        private readonly IMovieExternalService _movieExternalService;

        public MovieController(IMovieService movieService, IMovieExternalService movieExternalService)
        {
            _movieService = movieService;
            _movieExternalService = movieExternalService;
        }

        //VER UNA PELÍCULA (requiere estar autenticado)
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDto>> GetMovieById([FromRoute] int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            return Ok(movie);
        }

        //LISTAR PELÍCULAS (requiere estar autenticado)
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

        [HttpGet("Find")]
        public async Task<IActionResult> FindMovie([FromQuery] string? title)
        {
            if(string.IsNullOrWhiteSpace(title))
            {
                throw new AppValidationException("El titulo es obligatorio");
            }
            var movie = await _movieExternalService.SearchMovieAsync(title);
            return movie is null ? NotFound("No se encontró la película") : Ok(movie);
        }

    }
}