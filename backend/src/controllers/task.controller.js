import { TaskModel } from "../daos/mongodb/models/task.model.js";

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({ user: req.user.id}).populate('user');
        res.json(tasks);
        
    } catch (error) {
        next(error.message);
    }
};

export const getTasksById = async (req, res, next) => {
    try {
        const task = await TaskModel.findById(req.params.id).populate('user');
        if (!task) return res.status(404).json({ msg: "task not found" });
        res.json(task);
        
    } catch (error) {
        next(error.message);
    }
};

export const createTasks = async (req, res, next) => {
    try {
        const {title, asunto, description, date} = req.body;
    
        const newTask = new TaskModel({
            title,
            description,
            asunto,
            date,
            user: req.user.id
        })
        const savedTask = await newTask.save();
        res.json(savedTask);
        
    } catch (error) {
        next(error.message);
    }
};


export const updateTasks = async (req, res, next) => {
    try {
        const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!task) return res.status(404).json({ msg: "task not found" });
        res.json(task);
        
    } catch (error) {
        next(error.message);
    }
};

export const deleteTasks = async (req, res, next) => {
    try {
        const task = await TaskModel.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ msg: "task not found" });
        return res.sendStatus(204);
        
    } catch (error) {
        next(error.message);
    }
};


