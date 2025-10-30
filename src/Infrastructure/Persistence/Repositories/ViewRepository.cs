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
    }
}
