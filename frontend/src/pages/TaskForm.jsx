import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

function TaskForm() {

  const { register, handleSubmit, setValue } = useForm();
  const {createTask, getTaskById, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams(); //useParams me permite traer objeto con datos dinamicos que van con la url

  useEffect(() => {
    async function loadTask(){
      if(params.id){
        const task = await getTaskById(params.id);
        console.log(task);
        setValue('title', task.title)
        setValue('asunto', task.asunto)
        setValue('description', task.description)
      }
    }
    loadTask();
  },[])

  const onSubmit = handleSubmit((data) => {
    if(params.id) {
      updateTask(params.id, data);
      navigate('/task')
    } else {
      createTask(data);
      navigate('/task')
    }
  })

  return (
    <div className="container px-5 my-5">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card border-0 rounded-3 shadow-lg">
          <div className="card-body p-4">
            <div className="text-center">
              <div className="h1 fw-light">Task Form</div>        
            </div>

            <form onSubmit={onSubmit}>

              <div className="form-floating mb-3">
                <input className="form-control"  type="text" placeholder="title"
                {...register("title")}
                autoFocus/>
                <label >Titulo:</label>
                {/* <div className="invalid-feedback" data-sb-feedback="name:required">Name is required.</div> */}
              </div>

              <div className="form-floating mb-3">
                <input className="form-control"  type="text" placeholder="asunto"
                {...register("asunto")}
                autoFocus/>
                <label >Asunto:</label>
                {/* <div className="invalid-feedback" data-sb-feedback="name:required">Name is required.</div> */}
              </div>

              <div className="form-floating mb-3">
                <textarea className="form-control" type="text" style={{height: '10rem'}} placeholder="Message"
                {...register("description")}></textarea>
                <label >Descripcion:</label>
                {/* <div className="invalid-feedback" data-sb-feedback="message:required">Message is required.</div> */}
              </div>

              {/* <div className="d-none" id="submitSuccessMessage">
                <div className="text-center mb-3">
                  <div className="fw-bolder">Form submission successful!</div>
                  <p>To activate this form, sign up at</p>
                  <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                </div>
              </div>

              <div className="d-none" id="submitErrorMessage">
                <div className="text-center text-danger mb-3">Error sending message!</div>
              </div> */}

              <div className="d-grid">
                <button className="btn btn-primary btn-lg mb-3" id="submitButton" type="submit">Guardar</button>
              </div>
            </form>
              <div className="text-center " >
                <Link to="/task" className="small">Volver</Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TaskForm