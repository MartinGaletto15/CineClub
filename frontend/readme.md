
<h1 align="center">🎬 CineClub – Frontend</h1>

Interfaz web del sistema CineClub para la gestión de películas, géneros, directores, usuarios y registros de visualización.

---

## 📌 Descripción General

El frontend de **CineClub** es una aplicación web desarrollada con **React + Vite**, conectada al backend alojado en Azure.  
Permite a los usuarios autenticarse, navegar películas, ver detalles, gestionar entidades según su rol y obtener datos desde APIs externas como OMDB.

Incluye:

- 🔐 Autenticación basada en JWT  
- 👥 Manejo de roles (SuperAdmin / Admin / User)  
- 🎥 Gestión de películas, directores y géneros  
- ⭐ Posters y detalles desde API externa  
- ⚡ Entorno rápido gracias a Vite  
- 🎨 Diseño responsivo

---

## 🧱 Tecnologías Utilizadas

| Tecnología | Función |
|-----------|---------|
| **React + Vite** | Base del frontend |
| **React Router DOM** | Navegación |
| **Fetch API** | Consumo de API |
| **TailwindCSS** | Estilos |
| **JWT** | Autenticación |
| **LocalStorage** | Persistencia de sesión |

---

## 🚀 Instalación y Ejecución

### 1. Clonar el proyecto

```bash
git clone https://github.com/tuusuario/CineClub-Frontend.git
cd CineClub-Frontend
```
### 2. Instalar dependencias
```bash
npm install
```
### 3. Variables de entorno
Crear un archivo .env:
```bash
VITE_API_URL = https://cineclub-dev.azurewebsites.net
VITE_TMDB_APIKEY = tu_api_key
```
### 4. Ejecutar en modo desarrollo
```bash
npm run dev
```

## 🔐 Autenticación

El frontend utiliza JWT generados por el backend.  
El token se guarda en `localStorage` y se incluye automáticamente en las solicitudes protegidas.

---

## 📸 Funcionalidades

### 🟦 Para todos los usuarios
- Catálogo de películas  
- Detalles completos  
- Búsqueda y filtrado 
- Visualizaciones  

### 🟧 Para Admin / SuperAdmin
- ABM de películas  
- Gestión de directores y géneros  
- Administración de usuarios  


## 🌐 Integración con Backend

**API base:**
```bash
https://cineclub-dev.azurewebsites.net/swagger
```
Los servicios del frontend consumen esta API mediante Fetch.
```bash
npm run build
```
El resultado queda en:
```bash
dist/
```
Ideal para desplegar en:

- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Azure Static Web Apps**

<p align="center"><b>🎬 CineClub – El cine como experiencia.</b></p>