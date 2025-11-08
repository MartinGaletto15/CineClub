import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './components/mainLayout/MainLayout';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element = {<MainLayout/>}>
          <Route path = "/" element = {<Landing/>} />
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/register" element = {<Register/>} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;