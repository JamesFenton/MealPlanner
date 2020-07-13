import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "../config";
import { Payload } from "../middleware/auth";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  generateAccessToken: () => string;
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
    maxlength: 100,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

schema.methods.generateAccessToken = function() {
  const jwtPayload: Payload = {
    _id: this._id,
    name: this.name
  };
  return jwt.sign(jwtPayload, config.jwtPrivateKey);
};

export function validate(user) {
  const schema = {
    name: Joi.string()
      .required()
      .max(100),
    email: Joi.string()
      .required()
      .min(5)
      .max(100)
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .max(100)
  };

  return Joi.validate(user, schema);
}

export const User = mongoose.model<IUser>("User", schema);
