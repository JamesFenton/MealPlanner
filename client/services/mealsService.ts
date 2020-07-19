import axios from "axios";

const controllerUrl = "/api/meals";

export interface Meal {
  _id: string;
  name: string;
  ingredients: any;
}

export interface AddMealCommand {
  name: string;
  ingredients: IngredientQuantity[];
}

export interface IngredientQuantity {
  ingredient: string;
  quantity: number;
}

export function getMeal(id: string) {
  return axios.get(controllerUrl + "/" + id).then(r => r.data as Meal);
}

export function listMeals() {
  return axios.get(controllerUrl).then(r => r.data as Meal[]);
}

export function addMeal(command: AddMealCommand) {
  return axios.post(controllerUrl, command);
}
