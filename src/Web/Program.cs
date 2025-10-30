using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using Application.Services;
using Web.Middleware;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Repositories;
using Application.Interfaces;


var builder = WebApplication.CreateBuilder(args);

// AÑADE LOS SERVICIOS DE CONTROLADORES
builder.Services.AddControllers();

// AÑADE LOS SERVICIOS DEL GENERADOR DE SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// INYECCIÓN DE DEPENDENCIAS
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<IViewRepository, ViewRepository>();
builder.Services.AddScoped<IViewService, ViewService>();
builder.Services.AddScoped<IGenreService, GenreService>();
builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<IDirectorService, DirectorService>();
builder.Services.AddScoped<IDirectorRepository, DirectorRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<GlobalExceptionHandlingMiddleware>();

// BASE DE DATOS SQLITE
builder.Services.AddDbContext<CineClubContext>(options => options.UseSqlite(
    builder.Configuration["ConnectionStrings:DbConnectionString"]
));

var app = builder.Build();

// HABILITA EL MIDDLEWARE DE SWAGGER
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HABILITA EL MANEJADOR DE ERRORES GLOBAL
app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.MapGet("/", () => "Hello World!");

app.MapControllers();

app.Run();