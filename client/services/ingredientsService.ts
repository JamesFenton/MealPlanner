import axios from "axios";

export interface Ingredient {
  _id: string;
  name: string;
}

export function listIngredients() {
  return axios.get('/api/ingredients').then(r => r.data as Ingredient[]);
}