import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'


function Card({ task }) {

  const { deleteTask } = useTasks();
  return (
    // <div className="card border-success mb-3" style={{ width: '18rem' }}>

    //     <h5 className="card-header bg-transparent border-success mb-2">{task.title}</h5>
        
    //     <div className="card-body ">
    //         <h6 className="card-subtitle mb-2 text-body-dark">Asunto: {task.asunto}</h6>
    //         <p className="card-text text-body-secondary">Fecha: {task.date}</p>  
    //     </div>

    //     <div className="card-footer bg-transparent border-success ">
    //     <Link to="/" className="btn btn-primary mb-2">Ver</Link>
    //     <Link to="/" className="btn btn-danger mb-2">Eliminar</Link>
    //     </div>
    // </div>
    
    
        <div className="card border-info mb-3 p-3" style={{ width: '18rem' }}>
          <h5 className="card-header bg-transparent border-info mb-2">{task.title}</h5>
          <div className="card-body mb-2">
            <h6 className="card-subtitle mb-2 text-body-dark">Asunto: {task.asunto}</h6>
            <p className="card-text text-body-info">fecha de inicio: {new Date(task.date).toLocaleDateString()}</p>
          </div>
          <div className="card-footer border-info " >
          {/* <Link to="/" className="btn btn-primary mb-2 mr-2">Ver</Link> */}
          <Link to={`/updateTask/${task._id}`} className="btn btn-primary " 
          style={{ marginRight: '8px' }}>
            Ver
          </Link>

          <Link to="/task" className="btn btn-danger"
            onClick={() => {
              deleteTask(task._id);
          }}>
            Eliminar
          </Link>
          </div>
        </div>

        
     
    
  )
}

export default Card