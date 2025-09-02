import express from 'express';
import { getTasks, addTask, editTask, deleteTask } from '../controllers/taskcontroller.js';
import authMiddleware from '../middleware/authmiddleware.js';
import { validate, taskSchema } from '../middleware/validation.js';

const router = express.Router();

router.use(authMiddleware);  // Protect all task routes with JWT auth

router.get('/', getTasks);
router.post('/', validate(taskSchema), addTask);
router.put('/:id', validate(taskSchema), editTask);
router.delete('/:id', deleteTask);

export default router;