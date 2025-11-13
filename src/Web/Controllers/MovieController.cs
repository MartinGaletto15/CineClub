using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Application.Dtos;
using Domain.Exceptions;
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

        //VER UNA PELÍCULA (no requiere estar autenticado)
        [HttpGet("{id}")]
        public ActionResult<MovieDto> GetMovieById([FromRoute] int id)
        {
            var movie = _movieService.GetMovieById(id);
            return Ok(movie);
        }

        //LISTAR PELÍCULAS (no requiere estar autenticado)
        [HttpGet]
        public ActionResult<IEnumerable<MovieDto>> GetAllMovies()
        {
            var movies = _movieService.GetAllMovies();
            return Ok(movies);
        }

        //CREAR PELÍCULAS - SOLO Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost]
        public ActionResult<MovieDto> CreateMovie([FromBody] CreateMovieRequest createMovieDto)
        {
            var movieDto = _movieService.CreateMovie(createMovieDto);
            return CreatedAtAction(nameof(GetMovieById), new { id = movieDto.id }, movieDto);
        }

        //ACTUALIZAR - SOLO Admin o SuperAdmin
        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPut("{id}")]
        public ActionResult<MovieDto> UpdateMovie([FromRoute] int id, [FromBody] UpdateMovieRequest updateMovieDto)
        {
            var movie = _movieService.UpdateMovie(id, updateMovieDto);
            return Ok(movie);
        }

        //ELIMINAR - SOLO SuperAdmin
        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("{id}")]
        public ActionResult DeleteMovie([FromRoute] int id)
        {
            _movieService.DeleteMovie(id);
            return NoContent();
        }

        [HttpGet("popular")]
        public ActionResult<IEnumerable<MovieDto>> GetPopularMovies()
        {
            var movies = _movieService.GetPopularMovies();
            return Ok(movies);
        }

        //LLAMADA A API EXTERNA
        [HttpGet("Find")]
        public async Task<IActionResult> FindMovie([FromQuery] string? title)
        {
            if(string.IsNullOrWhiteSpace(title))
            {
                throw new AppValidationException("El titulo es obligatorio");
            }
            // Mantenemos await porque _movieExternalService es asíncrono
            var movie = await _movieExternalService.SearchMovieAsync(title);
            return movie is null ? NotFound("No se encontró la película") : Ok(movie);
        }
    }
}