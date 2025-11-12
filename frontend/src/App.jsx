import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from './components/mainLayout/MainLayout';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Protected from './components/protected/Protected';
import Movies from './components/movies/Movies';
import WatchList from './components/watchList/WatchList';
import MovieDetails from './components/movieDetails/MovieDetails';
import Profile from './components/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/home" element={<Home />} />
          <Route element={<Protected />}>
            <Route path="/movies" element={<Movies />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;