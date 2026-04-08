
# 🎨 CineClub Frontend

> Cliente web de CineClub construido con **React 18**, **Vite** y **Tailwind CSS**.

---

## 📝 Descripción

Frontend responsivo que proporciona una interfaz intuitiva para:

- Autenticación de usuarios (login/registro)
- Exploración de catálogo de películas
- Gestión de listas personalizadas
- Calificación y seguimiento de películas
- Perfil de usuario

---

## 🏗️ Estructura

```
frontend/
├── src/
│   ├── components/
│   │   ├── context/           # AuthContextProvider, AuthContext
│   │   ├── login/             # Página y servicios de login
│   │   ├── register/          # Registro de usuarios
│   │   ├── landing/           # Página de inicio
│   │   ├── movies/            # Catálogo de películas
│   │   ├── profile/           # Perfil de usuario
│   │   ├── mainLayout/        # Navbar, Footer, Layout general
│   │   ├── notifications/     # Toast notifications
│   │   └── watched/           # Lista de películas vistas
│   │
│   ├── App.jsx                # Rutas principales
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
│
├── public/                    # Assets estáticos
├── .env.local                 # Variables de entorno (local)
├── vite.config.js             # Configuración Vite
├── tailwind.config.js         # Tailwind CSS config
└── package.json
```

---

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js 18+
- npm o pnpm

### Pasos

```powershell
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env.local (si no existe)
# VITE_BASE_SERVER_URL=http://localhost:5027

# 3. Ejecutar en desarrollo
npm run dev

# 4. Build para producción
npm run build

# 5. Preview del build
npm run preview
```

---

## 🎯 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo (Vite) |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Ejecuta ESLint |

---

## 🔑 Variables de Entorno

Crear `.env.local` en la raíz del frontend:

```env
VITE_BASE_SERVER_URL=http://localhost:5027
```

- `VITE_BASE_SERVER_URL`: URL base de la API del backend

**Nota:** Los archivos `.env` y `.env.local` están en `.gitignore` y no se suben a git.

---

## 🎨 Componentes Principales

### AuthContextProvider
Gestiona el estado global de autenticación:
- Token JWT
- Datos del usuario (name, email, role, avatar)
- Funciones de login/logout

### Login / Register
- Formularios de autenticación
- Validación de credenciales
- Manejo de errores

### Movies
- Grid de películas
- Búsqueda y filtrado
- Detalles de película

### Profile
- Información del usuario
- Edición de perfil
- Listas personalizadas

---

## 🔗 Integración con Backend

### Endpoints Consumidos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Obtener JWT |
| POST | `/api/auth/register` | Registrar usuario |
| GET | `/api/movies` | Listar películas |
| GET | `/api/movies/{id}` | Detalles película |
| POST | `/api/view` | Registrar visualización |
| GET | `/api/user/me` | Datos usuario actual |

---

## 🛠️ Stack Tecnológico

| Librería | Versión | Propósito |
|----------|---------|----------|
| React | 18.3.1 | UI Framework |
| React Router | 7.9.5 | Enrutamiento |
| Vite | 5.0.0 | Build tool |
| Tailwind CSS | 3.4.14 | Estilos |
| React Icons | 5.5.0 | Iconos |
| React Toastify | 11.0.5 | Notificaciones |
| JWT Decode | 4.0.0 | Decodificar tokens |

---

## 🔐 Autenticación

### Flujo

1. Usuario se registra o inicia sesión
2. Backend retorna JWT
3. Frontend guarda token en `localStorage`
4. En cada request, incluye: `Authorization: Bearer {token}`
5. `AuthContextProvider` mantiene estado sincronizado

### Protección de Rutas

```jsx
<Route path="/protected" element={<Protected><Dashboard /></Protected>} />
```

`Protected` redirige a `/login` si no hay token válido.

---

## 🎨 Estilos

Tailwind CSS para estilos responsivos. Configuración en `tailwind.config.js`.

### Paleta de Colores
- **Primario:** Azul
- **Secundario:** Gris
- **Accento:** Naranja/Rojo

---

## 🚨 Manejo de Errores

- Validación de formularios en cliente
- Toasts de error/éxito con `react-toastify`
- Middleware de error en contexto
- Catch de excepciones en servicios

---

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints Tailwind (sm, md, lg, xl)
- Navbar adaptable con menú hamburguesa
- Grid de películas flexible

---

## 🔄 Estado Global

**Context API** para:
- Autenticación
- Datos del usuario
- Token JWT

Proyecto usa Context API en lugar de Redux/Zustand (proyecto relativamente pequeño).

---

## 🚀 Deploy

Frontend se puede desplegar en:
- **Vercel** (recomendado para Vite)
- **Netlify**
- **Azure Static Web Apps**
- **GitHub Pages**

---

## 📄 Licencia

Proyecto académico - UTN FRRO

---

<p align="center">
<b>🎨 Frontend CineClub</b>
</p>

<p align="center"><b>🎬 CineClub – El cine como experiencia.</b></p>