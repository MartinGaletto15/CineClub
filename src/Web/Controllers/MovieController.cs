using Microsoft.AspNetCore.Mvc;
using Application.Services;
using Application.Models.Requests;
using Application.Dtos;

namespace Web.Controllers;

public class MovieController : ControllerBase
{
    private readonly MovieService _movieService;

    public MovieController(MovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet("api/movies/{id}")]
    public ActionResult<MovieDto> GetMovieById([FromRoute] int id)
    {
        var movie = _movieService.GetMovieById(id);

        return Ok(movie);
    }

    [HttpGet("api/movies")]
    public ActionResult<List<MovieDto>> GetAllMovies()
    {
        var movies = _movieService.GetAllMovies();

        return Ok(movies);
    }

    [HttpPost("api/movies")]
    public ActionResult<MovieDto> CreateMovie([FromBody] CreateMovieRequest createMovieDto)
    {
        var movie = _movieService.CreateMovie(
            createMovieDto.Title,
            createMovieDto.DirectorId,
            createMovieDto.GenreId,
            createMovieDto.ReleaseDate,
            createMovieDto.Duration,
            createMovieDto.Synopsis,
            createMovieDto.Poster
        );

        return CreatedAtAction(nameof(GetMovieById), new { id = movie.Id }, MovieDto.Create(movie));
    }

    [HttpPut("api/movies/{id}")]
    public ActionResult<MovieDto> UpdateMovie([FromRoute] int id, [FromBody] UpdateMovieRequest updateMovieDto)
    {
        var movie = _movieService.UpdateMovie(id, updateMovieDto.Id, updateMovieDto.Title, updateMovieDto.DirectorId, updateMovieDto.GenreId, updateMovieDto.ReleaseDate, updateMovieDto.Duration, updateMovieDto.Synopsis, updateMovieDto.Poster);

        return Ok(movie);
    }

    [HttpDelete("api/movies/{id}")]
    public ActionResult DeleteMovie([FromRoute] int id)
    {
        _movieService.DeleteMovie(id);
        return NoContent();
    }

}