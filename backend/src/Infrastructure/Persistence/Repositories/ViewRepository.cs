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
            // Carga anticipada de Movie, sus Genres, y User.
            return _cineClubContext.Views
                .Include(v => v.Movie)
                    .ThenInclude(m => m.Genres)
                .Include(v => v.User)
                .Where(v => v.UserId == userId)
                .ToList();
        }

        public override IEnumerable<View> GetAll()
        {
            // Carga anticipada de User, Movie, y los Genres de la Movie.
            return _dbSet
                .Include(v => v.User)
                .Include(v => v.Movie)
                    .ThenInclude(m => m.Genres)
                .ToList();
        }

        public override View? GetById(int id)
        {
            // Carga anticipada de User, Movie, y los Genres de la Movie.
            return _dbSet
                .Include(v => v.User)
                .Include(v => v.Movie)
                    .ThenInclude(m => m.Genres)
                .FirstOrDefault(v => v.Id == id);
        }
    }
}