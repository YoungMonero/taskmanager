import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async register({ username, email, password }) {
    // Validate email uniqueness
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create user (password hashing handled by Sequelize hook)
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, message: "registered successfully"  };
  }

  static async login({ email, password }) {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }
}