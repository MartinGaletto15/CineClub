using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class MovieRepository : GenericRepository<Movie>, IMovieRepository
    {
        public MovieRepository(CineClubContext context) : base(context)
        {
            // La clase base 'GenericRepository' se encarga de
            // inicializar _context y _dbSet
        }

        public override IEnumerable<Movie> GetAll()
        {
            return _dbSet
                .Include(m => m.Director)
                .Include(m => m.Genres)
                .Include(m => m.Views)
                .ToList();
        }

        public override Movie? GetById(int id)
        {
            return _dbSet
                .Include(m => m.Director)
                .Include(m => m.Genres)
                .FirstOrDefault(m => m.Id == id);
        }

    }
}