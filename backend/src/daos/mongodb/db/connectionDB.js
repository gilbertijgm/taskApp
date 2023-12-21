import mongoose from "mongoose";


const connectionString = 'mongodb://127.0.0.1:27017/proyecto';
//const connectionStringATLAS = 'mongodb+srv://gilbertojgm:gilberto@cluster0.u7kmwds.mongodb.net/proyecto?retryWrites=true&w=majority';


export const initMongoDB = async () => {
    try {
        //await mongoose.connect(connectionStringATLAS);
        await mongoose.connect(connectionString);
        console.log('Conectado a la base de datos de mongoDB');
    } catch (error) {
        console.log(`error => ${error}`);
    }

}