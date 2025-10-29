using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Domain.Interfaces;
using Application.Services;
using Web.Middleware;

var builder = WebApplication.CreateBuilder(args);

// AÑADE LOS SERVICIOS DE CONTROLADORES
builder.Services.AddControllers();

// AÑADE LOS SERVICIOS DEL GENERADOR DE SWAGGER
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// INYECCION DE DEPENDENCIAS
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<MovieService>();
builder.Services.AddTransient<GlobalExceptionHandlingMiddleware>();

// BASE DE DATOS SQLITE
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(
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