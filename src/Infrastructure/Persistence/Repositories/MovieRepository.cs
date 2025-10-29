using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Persistence; // 👈 importante

namespace Infrastructure.Persistence.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly CineClubContext _context;

        public MovieRepository(CineClubContext context)
        {
            _context = context;
        }

        public Movie? GetById(int id)
        {
            return _context.Movies
                .Include(m => m.Director)
                .Include(m => m.Genre)
                .FirstOrDefault(m => m.Id == id);
        }

        public List<Movie>? GetAll()
        {
            return _context.Movies
                .Include(m => m.Director)
                .Include(m => m.Genre)
                .ToList();
        }

        public Movie Add(Movie movie)
        {
            _context.Movies.Add(movie);
            _context.SaveChanges();
            return movie;
        }

        public Movie Update(Movie movie)
        {
            _context.Movies.Update(movie);
            _context.SaveChanges();
            return movie;
        }

        public void Delete(int id)
        {
            var movie = _context.Movies.Find(id);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
                _context.SaveChanges();
            }
        }
    }
}