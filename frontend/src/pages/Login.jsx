import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
function Login() {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signin, errors: signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  useEffect(() => {
    if(isAuthenticated) navigate("/task")
  }, [isAuthenticated])

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Inicio de sesion</h5>
              {
                signinErrors.map((error, i) => (
                  <div className='text-danger mb-3' key={i}>
                    *{error}
                  </div>
                ))
              }
            <form onSubmit={onSubmit}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                {...register("email", {required: true})} autoFocus/>
                <label >Email</label>
                {errors.email && <p className='text-danger'>Email is requerido</p>}
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                {...register("password", {required: true})}/>
                <label >Password</label>
                {errors.email && <p className='text-danger'>Password is requerido</p>}
              </div>

              {/* <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                <label className="form-check-label" for="rememberPasswordCheck">
                  Remember password
                </label>
              </div> */}
              <div className="d-grid mb-3">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" 
                type="submit">
                  Entrar
                </button>
              </div>
            </form>
            <div className="text-center " >
                  <Link to="/register" className="small">Registrate aqui</Link>
            </div>          
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login