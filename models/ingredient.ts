import mongoose from "mongoose";
import Joi from "joi";

interface Ingredient extends mongoose.Document {
  name: string;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true }
});

export function validate(model) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(25)
  });
  return schema.validate(model);
}

export const Ingredient = mongoose.model<Ingredient>("Ingredient", schema);
