import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {

    const {loading, isAuthenticated} = useAuth();
    //console.log(loading, isAuthenticated);

    if(loading) return <h1>Loading...</h1>
    //verificamos si el usuario esta autenticado, si no esta autenticado lo redirigimos al login 
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/> //replace para que no vuelva a la ruta anterior
  return <Outlet />
}

export default ProtectedRoute