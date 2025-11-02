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

        public override async Task<IEnumerable<Movie>> GetAllAsync()
        {
            return await _dbSet
                .Include(m => m.Director)
                .Include(m => m.Genres)
                .ToListAsync();
        }

        public override async Task<Movie?> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(m => m.Director)
                .Include(m => m.Genres)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

    }
}