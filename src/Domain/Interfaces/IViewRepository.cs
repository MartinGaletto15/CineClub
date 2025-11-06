using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IViewRepository : IGenericRepository<View>
    {
        IEnumerable<View> GetViewsByUserId(int userId);
    }
}