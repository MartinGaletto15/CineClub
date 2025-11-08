using Domain.Entities;
using Domain.Interfaces;

namespace Infrastructure.Persistence.Repositories
{
    public class GenreRepository : GenericRepository<Genre>, IGenreRepository
    {
        public GenreRepository(CineClubContext context) : base(context)
        {
            // La clase base 'GenericRepository' se encarga de
            // inicializar _context y _dbSet
        }

    }
}