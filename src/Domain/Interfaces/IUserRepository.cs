using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
         // Si necesitás métodos específicos para usuario, los agregás acá.
        // Ejemplo:
        // Task<User?> GetByEmailAsync(string email);
    }
}