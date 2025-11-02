using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories
{
    public class ViewRepository : GenericRepository<View>, IViewRepository
    {
        private readonly CineClubContext _cineClubContext;

        public ViewRepository(CineClubContext context) : base(context)
        {
            _cineClubContext = context;
        }

        public async Task<IEnumerable<View>> GetViewsByUserIdAsync(int userId)
        {
            return await _cineClubContext.Views
                .Include(v => v.Movie)
                .Where(v => v.UserId == userId)
                .ToListAsync();
        }

        public override async Task<IEnumerable<View>> GetAllAsync()
        {
            return await _dbSet
                .Include(v => v.User)
                .Include(v => v.Movie)
                .ToListAsync();
        }

        public override async Task<View?> GetByIdAsync(int id)
        {
            return await _dbSet
                .Include(v => v.User)
                .Include(v => v.Movie)
                .FirstOrDefaultAsync(v => v.Id == id);
        }
    }
}
