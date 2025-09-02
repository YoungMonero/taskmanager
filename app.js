import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import specs from './src/config/swagger.js';
import authRoutes from './src/routes/authroutes.js';
import taskRoutes from './src/routes/taskroute.js';
import errorHandler from './src/middleware/errorhandler.js';

// Load models to sync DB
import './src/models/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Centralized Error Handler
app.use(errorHandler);

export default app;