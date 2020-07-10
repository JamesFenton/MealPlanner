import mongoose from 'mongoose';

interface Ingredient extends mongoose.Document {
  name: string;
}

interface IngredientQuantity extends mongoose.Document {
  ingredient: Ingredient;
  quantity: number;
}

interface Meal extends mongoose.Document {
  name: string;
  ingredients: IngredientQuantity[];
}

const ingredientSchema = new mongoose.Schema({
  ingredient: {type: mongoose.SchemaTypes.ObjectId, ref: 'Ingredient'},
  quantity: {type: Number, min: 0}
})

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  ingredients: [ingredientSchema]
});

export const Meal = mongoose.model<Meal>('Meal', schema);