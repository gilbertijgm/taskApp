import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const { register, handleSubmit, 
        formState: {errors} } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/task');
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async(values) => { 
        signup(values);
    })
  return (
      <div className="container">
          <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                  <div className="card border-0 shadow rounded-3 my-5">
                      <div className="card-body p-4 p-sm-5">
                          <h5 className="card-title text-center mb-5 fw-light fs-5">Registro de Usuario</h5>
                          { 
                          registerErrors.map((error, i) => (
                            <div className='text-danger' key={i}>
                                *{error}
                            </div>
                          ))
                          }
                          <form onSubmit={onSubmit}>
                              <div className="row">
                                  <div className="form-group ">
                                      <div className="form-floating mb-3">
                                          <input className='form-control mb-4 form-control-lg'
                                              type="text" placeholder='Username'
                                              {...register("username", { required: true })} autoFocus />
                                          <label className='form-label' >Username</label>
                                          {errors.username && <p className='text-danger'>Username es requerido</p>}
                                      </div>

                                      <div className="form-floating">
                                          <input className='form-control mb-4 form-control-lg'
                                              type="email" placeholder='Email'
                                              {...register("email", { required: true })} />
                                          <label className='form-label' >Email</label>
                                          {errors.email && <p className='text-danger'>Email is requerido</p>}
                                      </div>

                                      <div className="form-floating">
                                          <input className='form-control mb-4 form-control-lg'
                                              type="password" placeholder='Password'
                                              {...register("password", { required: true })} />
                                          <label className='form-label'>Password</label>
                                          {errors.email && <p className='text-danger'>Password is requerido</p>}
                                      </div>

                                      <div className="d-grid mb-3">
                                          <button className="btn btn-primary btn-login text-uppercase fw-bold"
                                              type="submit">Register</button>
                                         
                                      </div>
                                  </div>
                              </div>
                          </form>
                          <div className="text-center " >
                              <Link to="/login" className="small">Volver</Link>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )                    
}

export default Register