import Joi from 'joi';

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.min': '"username" must be at least 3 characters long',
    'any.required': '"username" is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'any.required': '"email" is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" must be at least 6 characters long',
    'any.required': '"password" is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'any.required': '"email" is required',
  }),
  password: Joi.string().required().messages({
    'any.required': '"password" is required',
  }),
});

export const taskSchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.title':'title must be atleast 3 characters',
  }),
  description: Joi.string().optional(),
});

export { validate };