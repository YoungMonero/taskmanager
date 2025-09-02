import express from 'express';
import { register, login } from '../controllers/authcontroller.js';
import { validate, registerSchema, loginSchema } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;