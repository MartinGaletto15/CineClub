<p align="center">
  <img src="sandbox:/mnt/data/cineclub_logo_transparent.png" width="350"/>
</p>

<h1 align="center">🎬 CineClub API</h1>

<p align="center">
  Proyecto Final Integrador – Programación IV – UTN FRRO  
  <br>
  Sistema backend para la gestión de películas, usuarios, géneros y visualizaciones.
</p>

---

## 👥 Integrantes

| Nombre | Rol |
|-------|-----|
| **Kevin Kener** | Desarrollo Backend / Arquitectura |
| **Martín Galetto** | Desarrollo Backend / Documentación / Testing |

---

## 📝 Descripción General

**CineClub** es una API REST que permite administrar un catálogo de películas, sus directores, géneros asociados, usuarios y registros de visualización.

El sistema incorpora:

- ✅ CRUD completo en todas las entidades principales
- ✅ Autenticación con **JWT**
- ✅ Manejo de roles (SuperAdmin / Admin / User)
- ✅ Protección de rutas con `[Authorize]`
- ✅ Documentación y testeo mediante **Swagger**

---

## 🧱 Arquitectura del Proyecto

El proyecto sigue el patrón **Clean Architecture**, desacoplando las responsabilidades en capas:

📦 CineClub
┣ 📂 Domain → Entidades, Interfaces, Enums
┣ 📂 Application → DTOs, Servicios, Reglas de Negocio
┣ 📂 Infrastructure → Repositorios, EF Core, DbContext
┗ 📂 Web → Controladores, Middlewares, Swagger, JWT



---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| **.NET 8 Web API** | Backend principal |
| **Entity Framework Core** | ORM y acceso a datos |
| **SQLite**| Base de datos de desarrollo |
| **SQL Server** | Base de datos final en Azure |
| **JWT Authentication** | Inicio de sesión y autorización por roles |
| **Swagger / OpenAPI** | Testing y documentación |
| **Azure App Service** | Host final de la API |
| **HttpClientFactory** | Consumo de API externa (TMDB) |

---

## ✅ Requisitos del TP Cumplidos

| Requisito | Estado |
|-----------|:------:|
| Arquitectura por capas | ✅ |
| CRUD completo de entidades | ✅ |
| Patrón Repositorio + Servicio | ✅ |
| Swagger documentando endpoints | ✅ |
| Autenticación JWT funcional | ✅ |
| Inclusión de roles en el token | ✅ |
| Protección de endpoints `[Authorize]` | ✅ |

---

## ⏳ Requisitos Restantes para Aprobación Directa

| Requisito | Estado | Detalle |
|-----------|:------:|---------|
| Variable de entorno para el JWT Secret en Azure |
| Migración a SQL Server en Azure 
| CI/CD con GitHub Actions
| Consumo de API externa (OMDB) con HttpClientFactory 

---

## 🔐 Autenticación JWT

### Login

POST /api/User/Login


### Ejemplo Body:
json
{
  "email": "kevin@test.com",
  "password": "123456"
}

Respuesta:
{
  "token": "eyJhbGciOiJIUz..."
}

Activarlo en Swagger:

Authorize → Bearer eyJhbGciOi...

🎯 Endpoints Principales

| Método | Ruta              | Descripción                 |
| ------ | ----------------- | --------------------------- |
| GET    | `/api/Movie`      | Lista todas las películas   |
| POST   | `/api/Movie`      | Crea una nueva película     |
| GET    | `/api/Genre`      | Lista géneros               |
| GET    | `/api/Director`   | Lista directores            |
| POST   | `/api/User/Login` | Obtiene JWT                 |
| GET    | `/api/User`       | (Protegido): Lista usuarios |

🚀 Ejecución En La Nube SQL Azure
https://cineclub-dev.azurewebsites.net/swagger/

🚀 Ejecución Local

cd src/Web
dotnet run

Abrir Swagger:

http://localhost:5027/swagger

<p align="center"> <b>🎬 CineClub – Donde las películas viven.</b> </p> ```





