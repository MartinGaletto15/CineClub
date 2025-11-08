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

        public IEnumerable<View> GetViewsByUserId(int userId)
        {
            return _cineClubContext.Views
                .Include(v => v.Movie)
                .Where(v => v.UserId == userId)
                .ToList();
        }

        public override IEnumerable<View> GetAll()
        {
            return _dbSet
                .Include(v => v.User)
                .Include(v => v.Movie)
                .ToList();
        }

        public override View? GetById(int id)
        {
            return _dbSet
                .Include(v => v.User)
                .Include(v => v.Movie)
                .FirstOrDefault(v => v.Id == id);
        }
    }
}