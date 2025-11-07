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

            modelBuilder.Entity<User>()
            .HasMany(u => u.Views)
            .WithOne(v => v.User)
            .HasForeignKey(v => v.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Movie>()
            .HasMany(m => m.Views)
            .WithOne(v => v.Movie)
            .HasForeignKey(v => v.MovieId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}