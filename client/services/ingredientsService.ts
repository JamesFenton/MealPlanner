import axios from "axios";

export interface Ingredient {
  _id: string;
  name: string;
}

export function listIngredients() {
  return axios.get("/api/ingredients").then(r => r.data as Ingredient[]);
}

export function addIngredient(ingredient) {
  return axios.post("/api/ingredients", ingredient);
}

export function deleteIngredient(id) {
  return axios.delete("/api/ingredients/" + id);
}
