import mongoose from 'mongoose';
import Joi from "joi";

interface User extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
}

const schema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    maxlength: 100
  },
  email: {
    type: String, 
    required: true, 
    unique: true,
    minlength: 5,
    maxlength: 100
  },
  passwordHash: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 1024}
});

export function validate(user) {
  const schema = {
    name: Joi.string().required().max(100),
    email: Joi.string().required().min(5).max(100).email(),
    password: Joi.string().required().min(5).max(100),
  }

  return Joi.validate(user, schema);
}

export const User = mongoose.model<User>('User', schema);