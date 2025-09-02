import { AuthService } from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { token } = await AuthService.register({ username, email, password });
    res.status(201).json({message: 'Registered successfully', token});
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token } = await AuthService.login({ email, password });
    res.json({message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
};