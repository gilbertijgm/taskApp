import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Task from './pages/Task';
import Profile from './pages/Profile';
import TaskForm from './pages/TaskForm';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TaskContext';
import Nav from './components/Nav';


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Nav />
          <div className="container p-4">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />


              <Route element={<ProtectedRoute />}>
                <Route path='/task' element={<Task />} />
                <Route path='/createTask' element={<TaskForm />} />
                <Route path='/updateTask/:id' element={<TaskForm />} />
                <Route path='/profile' element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
