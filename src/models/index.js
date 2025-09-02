import sequelize from '../config/sequelize.js';
import User from './User.js';
import Task from './Task.js';

// Associations
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

// Sync models
sequelize.sync({ alter: true }).then(() => console.log('Database synced'));

export { User, Task };
