using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Application.Models.Requests;
using Application.Dtos;

namespace Web.Controllers
{
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("api/movies/{id}")]
        public async Task<ActionResult<MovieDto>> GetMovieById([FromRoute] int id)
        {
            try
            {
                var movie = await _movieService.GetMovieByIdAsync(id);
                return Ok(movie);
            }
            catch (Domain.Exceptions.AppValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("api/movies")]
        public async Task<ActionResult<IEnumerable<MovieDto>>> GetAllMovies()
        {
            var movies = await _movieService.GetAllMoviesAsync();
            return Ok(movies);
        }

        [HttpPost("api/movies")]
        public async Task<ActionResult<MovieDto>> CreateMovie([FromBody] CreateMovieRequest createMovieDto)
        {
            var movieDto = await _movieService.CreateMovieAsync(createMovieDto);

            return CreatedAtAction(nameof(GetMovieById), new { id = movieDto.id }, movieDto);
        }

        [HttpPut("api/movies/{id}")]
        public async Task<ActionResult<MovieDto>> UpdateMovie([FromRoute] int id, [FromBody] UpdateMovieRequest updateMovieDto)
        {
            try
            {
                var movie = await _movieService.UpdateMovieAsync(id, updateMovieDto);
                return Ok(movie);
            }
            catch (Domain.Exceptions.AppValidationException ex)
            {
                if (ex.Message.Contains("coinciden"))
                    return BadRequest(ex.Message);
                
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("api/movies/{id}")]
        public async Task<ActionResult> DeleteMovie([FromRoute] int id)
        {
            try
            {
                await _movieService.DeleteMovieAsync(id);
                return NoContent();
            }
            catch (Domain.Exceptions.AppValidationException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}