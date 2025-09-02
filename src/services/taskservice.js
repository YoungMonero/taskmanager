import { Task } from '../models/index.js';

export class TaskService {
  static async getTasks(userId) {
    return Task.findAll({ where: { userId } });
  }

  static async addTask({ title, description, userId }) {
    return Task.create({ title, description, userId });
  }

  static async editTask(taskId, { title, description, userId }) {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      throw new Error('Task not found or not owned by user');
    }
    await task.update({ title, description });
    return task;
  }

  static async deleteTask(taskId, userId) {
    const task = await Task.findOne({ where: { id: taskId, userId } });
    if (!task) {
      throw new Error('Task not found or not owned by user');
    }
    await task.destroy();
    return { message: 'Task deleted' };
  }
}