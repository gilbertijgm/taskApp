import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createTasks, deleteTasks, getTasks, getTasksById, updateTasks } from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createSchema } from "../middlewares/validateSchema/task.schema.js";

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTasksById);
router.post('/tasks', authRequired, validateSchema(createSchema),createTasks);
router.put('/tasks/:id', authRequired, updateTasks);
router.delete('/tasks/:id', authRequired, deleteTasks);

export default router;

