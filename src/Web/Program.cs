using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using Application.Services;
using Web.Middleware;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Repositories;
using Application.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CineClub API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Ingrese el token JWT usando: Bearer {token}"
    });


    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


// Inyección de dependencias
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
builder.Services.AddScoped<IMovieExternalService, MovieExternalService>();

builder.Services.AddTransient<GlobalExceptionHandlingMiddleware>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Base de datos
builder.Services.AddDbContext<CineClubContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

ApiClientConfiguration apiClientConfiguration = new()
{
    RetryCount = 2,
    retryAttemptInSeconds = 3,
    DurationOfBreakInSeconds = 120,
    HandledEventsAllowedBeforeBreaking = 10
};

builder.Services.AddHttpClient("OMDb", client =>
{
    client.BaseAddress = new Uri("https://www.omdbapi.com/");
})
.AddPolicyHandler(PollyResiliencePolicies.GetRetryPolicy(apiClientConfiguration))
.AddPolicyHandler(PollyResiliencePolicies.GetCircuitBreakerPolicy(apiClientConfiguration));

// JWT Authentication
var secret = builder.Configuration["JwtSettings:Secret"]
    ?? throw new Exception("No se encontró la key JWT. Asegurate de configurar JwtSettings:Secret en appsettings.json o como variable de ambiente.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();


app.UseMiddleware<GlobalExceptionHandlingMiddleware>();

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello World!");
app.MapControllers();
app.Run();