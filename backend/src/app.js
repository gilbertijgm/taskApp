//imports
import express from 'express';
const app = express();
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';   
import { initMongoDB } from './daos/mongodb/db/connectionDB.js';
//import routes
import authRoutes from './routes/auth.route.js';
import taskRoutes from './routes/task.route.js';
import { errorHandler } from './middlewares/errorHandler.js';
//settings
initMongoDB(); //conexion db
const PORT = 8080;
app.listen(PORT, () => console.log(`server ok en el puerto ${PORT}`));


//middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(errorHandler);



//routes
app.use("/api", authRoutes)
app.use("/api", taskRoutes)
