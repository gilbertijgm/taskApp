import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Nav() {

    const {isAuthenticated, logout, user} = useAuth();

    return (


        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                {isAuthenticated ? (
                    <>
                    <Link to={isAuthenticated ? "/task" : "/login"} 
                    className="navbar-brand p-3 bg-info-subtle text-emphasis-info" >Task App</Link>
                    <Link className="btn btn-success mb-2 " style={{ marginRight: '8px' }} to="/createTask">
                                Crear Tarea
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            
                            <li className="nav-item dropdown">
                                <div className="dropdown">
                                    <Link className="btn btn-outline-info dropdown-toggle" to="" 
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.username}
                                    </Link>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/login"
                                            onClick={() => logout()}>
                                                Cerrar Sesion
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                    </>
                ) : (
                    <>
                        <Link className="navbar-brand" to="#">TaskApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">                    
                            <li className="nav-item">
                                <Link className="nav-link " to="/create">Login</Link>
                            </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user">Register</Link>
                                </li>                                                      
                        </ul>
                    </div>
                    </>
                )}
            </div>
        </nav>


    )
}

export default Nav