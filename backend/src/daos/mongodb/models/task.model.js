import mongoose from 'mongoose';

export const tasksCollectionName = "tasks"; //creo el nombre de la colecion o tabla

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    asunto: { type: String, required: true, trim: true },
    description: { type: String, trim: true},
    date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, {
    timestamps: true
});


export const TaskModel = mongoose.model(
    tasksCollectionName,
    taskSchema
);