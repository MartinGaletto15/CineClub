import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { isTokenValid } from '../context/AuthContextHelper';

const Protected = () => {
  const { token } = useContext(AuthContext);

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />
  } else {
    return <Outlet />
  }
}

export default Protected