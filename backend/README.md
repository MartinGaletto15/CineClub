# 🔌 CineClub Backend API

> API REST desarrollada con **.NET 8**, **Entity Framework Core** y **autenticación JWT**.

---

## 📝 Descripción

Backend que gestiona:

- ✅ CRUD de películas, géneros, directores
- ✅ Autenticación JWT y roles de usuario
- ✅ Seguimiento de visualizaciones
- ✅ Integración con API externa (OMDb)
- ✅ Documentación Swagger/OpenAPI

---

## 🏗️ Arquitectura

Arquitectura limpia en **4 capas**:

```
Web (Controladores, Swagger, JWT)
    ↓
Application (DTOs, Servicios, Reglas de negocio)
    ↓
Domain (Entidades, Interfaces, Excepciones)
    ↓
Infrastructure (Repositorios, EF Core, DbContext)
```

### Estructura del Proyecto

```
backend/
├── CineClub.sln
├── src/
│   ├── Domain/
│   │   ├── Entities/          # User, Movie, Genre, Director, View
│   │   ├── Interfaces/        # Contratos de repositorios
│   │   └── Exceptions/        # AppValidationException
│   │
│   ├── Application/
│   │   ├── Interfaces/        # IMovieService, IUserService, etc.
│   │   ├── Models/
│   │   │   ├── DTOs/          # MovieDto, UserDto, etc.
│   │   │   └── Requests/      # CreateMovieRequest, LoginRequest, etc.
│   │   └── Services/          # MovieService, UserService, etc.
│   │
│   ├── Infrastructure/
│   │   ├── Persistence/
│   │   │   ├── CineClubContext.cs
│   │   │   └── Repositories/  # MovieRepository, UserRepository, etc.
│   │   ├── Migrations/        # EF Core migrations
│   │   ├── ApiClientConfiguration.cs
│   │   └── PollyResiliencePolicies.cs
│   │
│   └── Web/
│       ├── Controllers/       # ApiController, AuthController, etc.
│       ├── Middlewares/       # GlobalExceptionHandlingMiddleware
│       ├── Program.cs         # DI, Auth, CORS, Swagger
│       ├── appsettings.json
│       └── appsettings.Development.json
│
├── Archive/                   # Migraciones antiguas
└── README.md
```

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| .NET | 8.0 | Runtime |
| Entity Framework Core | 8.x | ORM |
| SQL Server | - | Base de datos |
| JWT Bearer | 8.0.4 | Autenticación |
| Swagger (Swashbuckle) | 6.x | Documentación |
| Polly | - | Resiliencia |

---

## 🚀 Instalación y Ejecución

### Requisitos
- .NET 8 SDK
- SQL Server (local o remoto)

### Pasos

```powershell
# 1. Navegar a Web
cd src/Web

# 2. Restaurar dependencias
dotnet restore

# 3. Configurar el servidor de desarrollo
$Env:ASPNETCORE_ENVIRONMENT = "Development"

# 4. Ejecutar
dotnet run
```

**Swagger:** `http://localhost:5027/swagger`

---

## ⚙️ Configuración

### appsettings.Development.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-S9L3H6E;Database=CineClubApi;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "Secret": "EstaClaveEsSoloParaDesarrolloLocal123!"
  },
  "OMDb": {
    "ApiKey": "17f27fe4"
  }
}
```

---

## 🔑 Entidades Principales

### User
- id, name, lastName, email, password, avatar, role
- Roles: SuperAdmin, Admin, User

### Movie
- id, title, year, poster, plot, rating, directorId

### Genre
- id, name

### Director
- id, name, birthDate

### View (Visualización)
- id, userId, movieId, watchDate, rating

---

## 🔐 Autenticación JWT

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Generar JWT |
| POST | `/api/auth/register` | Registrar usuario |

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "contraseña"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar Token en Swagger

1. Click en **Authorize**
2. Ingresar: `Bearer {token}`
3. Las peticiones incluirán el header automáticamente

---

## 🎯 Endpoints Principales

### Movies
| Método | Ruta | Protegido |
|--------|------|----------|
| GET | `/api/movies` | ❌ |
| GET | `/api/movies/{id}` | ❌ |
| POST | `/api/movies` | ✅ Admin |
| PUT | `/api/movies/{id}` | ✅ Admin |
| DELETE | `/api/movies/{id}` | ✅ Admin |

### Genres
| Método | Ruta |
|--------|------|
| GET | `/api/genres` |
| POST | `/api/genres` |

### Directors
| Método | Ruta |
|--------|------|
| GET | `/api/directors` |
| POST | `/api/directors` |

### Views (Visualizaciones)
| Método | Ruta |
|--------|------|
| GET | `/api/view/user/{userId}` |
| POST | `/api/view` |

---

## 🔄 Patrón Repositorio

Cada entidad tiene:

1. **Interface en Domain:**
   ```csharp
   public interface IMovieRepository : IGenericRepository<Movie>
   {
       // Métodos específicos
   }
   ```

2. **Implementación en Infrastructure:**
   ```csharp
   public class MovieRepository : GenericRepository<Movie>, IMovieRepository
   {
       // Implementación
   }
   ```

3. **Inyección en Program.cs:**
   ```csharp
   builder.Services.AddScoped<IMovieRepository, MovieRepository>();
   ```

---

## 🛡️ Middleware

### GlobalExceptionHandlingMiddleware

Captura excepciones y retorna respuestas estandarizadas:

- `AppValidationException` → 400 Bad Request
- Excepciones genéricas → 500 Internal Server Error

---

## 🔄 Migraciones

```powershell
# Ver migraciones
dotnet ef migrations list --project src/Infrastructure --startup-project src/Web

# Crear nueva migración
dotnet ef migrations add NombreMigracion --project src/Infrastructure --startup-project src/Web

# Aplicar migraciones
dotnet ef database update --project src/Infrastructure --startup-project src/Web
```

---

## 🌐 Consumo API Externa (OMDb)

Via `HttpClientFactory` con políticas Polly:

```csharp
builder.Services.AddHttpClient("OMDb", client =>
{
    client.BaseAddress = new Uri("https://www.omdbapi.com/");
})
.AddPolicyHandler(PollyResiliencePolicies.GetRetryPolicy(...))
.AddPolicyHandler(PollyResiliencePolicies.GetCircuitBreakerPolicy(...));
```

- Reintenta en caso de fallo
- Circuit breaker tras fallos consecutivos

---

## ✅ Requisitos del Proyecto Cumplidos

| Requisito | Status |
|-----------|:------:|
| Arquitectura por capas | ✅ |
| CRUD completo | ✅ |
| Patrón Repositorio | ✅ |
| Swagger documentado | ✅ |
| JWT + Roles | ✅ |
| Endpoints protegidos | ✅ |
| Excepciones manejadas | ✅ |
| API externa (OMDb) | ✅ |
| SQL Server | ✅ |
| CI/CD | ✅ |

---

## 👥 Autores

| Nombre | Rol |
|--------|-----|
| **Kevin Kener** | Backend / Documentación |
| **Martín Galetto** | Backend / Arquitectura |

---

## 📄 Licencia

Proyecto académico - UTN FRRO - Programación IV

---

<p align="center">
<b>🎬 CineClub – El cine como experiencia.</b>
</p>






