import mongoose from 'mongoose';

interface Ingredient extends mongoose.Document {
  name: string;
}

const schema = new mongoose.Schema({
  name: {type: String, required: true}
});

export const Ingredient = mongoose.model<Ingredient>('Ingredient', schema);