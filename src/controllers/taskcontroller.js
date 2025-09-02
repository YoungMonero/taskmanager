import { TaskService } from '../services/taskservice.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskService.getTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const addTask = async (req, res, next) => {
  try {
    const task = await TaskService.addTask({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const editTask = async (req, res, next) => {
  try {
    const task = await TaskService.editTask(req.params.id, { ...req.body, userId: req.user.id });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const result = await TaskService.deleteTask(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};