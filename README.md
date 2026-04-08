# 🎬 CineClub - Full Stack

> **CineClub** es una aplicación web full stack para descubrir, gestionar y compartir películas. Sistema integrado de backend (.NET 8 API) y frontend (React + Vite).

---

## 📋 Descripción General

**CineClub** permite a usuarios:

- ✅ Registrarse e iniciar sesión
- ✅ Explorar un catálogo de películas
- ✅ Ver detalles de películas (director, género, sinopsis)
- ✅ Crear listas personalizadas de películas para ver
- ✅ Calificar y hacer seguimiento de películas vistas
- ✅ Consumir datos externos de la API OMDb

El proyecto implementa autenticación JWT, roles de usuario y una arquitectura limpia de capas.

---

## 🏗️ Estructura del Proyecto

```
CineClub/
├── backend/                    # API REST (.NET 8)
│   ├── src/
│   │   ├── Domain/
│   │   ├── Application/
│   │   ├── Infrastructure/
│   │   └── Web/               # Controladores, Swagger
│   ├── CineClub.sln
│   └── README.md              # Documentación backend
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── package.json
│   └── README.md              # Documentación frontend
│
├── .gitignore
└── README.md                   # Este archivo
```

---

## 🚀 Inicio Rápido

### Backend

```powershell
cd backend/src/Web
$Env:ASPNETCORE_ENVIRONMENT = "Development"
dotnet run
```

**Swagger API:** `http://localhost:5027/swagger`

> Requiere SQL Server local. Configurar en `backend/src/Web/appsettings.Development.json`

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

**Aplicación:** `http://localhost:5173`

---

## 📚 Documentación

- **Backend:** Ver [backend/README.md](backend/README.md)
- **Frontend:** Ver [frontend/README.md](frontend/readme.md)

---

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| **Kevin Kener** | Desarrollo Backend / Frontend / Documentación |
| **Martín Galetto** | Desarrollo Backend / Frontend / Arquitectura |

---

## 🛠️ Stack Tecnológico

### Backend
- .NET 8 Web API
- Entity Framework Core
- JWT Authentication
- SQL Server
- Swagger/OpenAPI

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Context API

---

## ✅ Features

- [x] Autenticación JWT
- [x] Roles de usuario (SuperAdmin, Admin, User)
- [x] CRUD de películas, géneros, directores
- [x] Seguimiento de visualizaciones
- [x] Listas personalizadas
- [x] Consumo de API externa (OMDb)
- [x] Swagger/OpenAPI documentado
- [x] CORS habilitado
- [x] Middleware de manejo de excepciones

---

## 📄 Licencia

Proyecto académico - UTN FRRO - Programación IV

---

<p align="center">
<b>🎬 CineClub – El cine como experiencia.</b>
</p>
