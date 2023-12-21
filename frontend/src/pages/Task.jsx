import React, { useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import Card from '../components/Card';

function Task() {

  const {getTasks, tasks} =  useTasks();

  useEffect(() => {
    getTasks();
  },[])

  if(tasks.length === 0) return (<h1>No hay tareas </h1>)

  return (
    
      <div className="container-fluid">
        <div className="row row-cols-auto  g-4">
          {
            tasks.map((task) => (
              <div className="col " key={task._id}>
              <Card task={task} />
              </div>
            ))
          }
       </div> 
       
      </div>
        
      
      
   
    
  )
}

export default Task