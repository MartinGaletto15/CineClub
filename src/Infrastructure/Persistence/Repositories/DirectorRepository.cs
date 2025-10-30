using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class DirectorRepository : GenericRepository<Director>, IDirectorRepository
    {
        public DirectorRepository(CineClubContext context) : base(context)
        {
            // La clase base 'GenericRepository' se encarga de
            // inicializar _context y _dbSet
        }

    }
}