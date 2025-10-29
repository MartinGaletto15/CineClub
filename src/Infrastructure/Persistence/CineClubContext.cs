using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class CineClubContext : DbContext
    {
        public CineClubContext(DbContextOptions<CineClubContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<View> Views { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ejemplo de relación (si querés definirlas manualmente)
            modelBuilder.Entity<View>()
                .HasOne(v => v.User)
                .WithMany()
                .HasForeignKey(v => v.UserId);

            modelBuilder.Entity<View>()
                .HasOne(v => v.Movie)
                .WithMany()
                .HasForeignKey(v => v.MovieId);
        }
    }
}
