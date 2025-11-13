import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import MainLayout from './components/mainLayout/MainLayout';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';

import Protected from './components/protected/Protected';
import Public from './components/protected/Public';  // ⬅️ IMPORTANTE

import Movies from './components/movies/Movies';
import WatchList from './components/watchList/WatchList';
import MovieDetails from './components/movieDetails/MovieDetails';
import Profile from './components/profile/Profile';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* RUTAS CON LAYOUT GENERAL */}
        <Route element={<MainLayout />}>

          {/* 🔓 RUTAS PÚBLICAS (solo si NO estás logueado) */}
          <Route element={<Public />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* 🔒 RUTAS PROTEGIDAS (solo si estás logueado) */}
          <Route element={<Protected />}>
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>

          {/* Ruta accesible para todos */}
          <Route path="/movie/:id" element={<MovieDetails />} />

        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;