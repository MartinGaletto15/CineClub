using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IViewRepository : IGenericRepository<View>
    {
        Task<IEnumerable<View>> GetViewsByUserIdAsync(int userId);
    }
}

//(Esto asume que ya existe un IGenericRepository<T>con métodos CRUD genéricos.)