import axios from "axios";

const controllerUrl = "/api/meals";

export interface Meal {
  _id: string;
  name: string;
  ingredients: any;
}

export interface AddMealCommand {
  _id: string;
  name: string;
  ingredients: IngredientQuantity[];
}

export interface IngredientQuantity {
  ingredient: string;
  quantity: number;
}

export const getMeal = (id: string) =>
  axios.get(controllerUrl + "/" + id).then((r) => r.data as Meal);

export const listMeals = () =>
  axios.get(controllerUrl).then((r) => r.data as Meal[]);

export const addMeal = (command: AddMealCommand) =>
  axios.post(controllerUrl, command);

export const deleteMeal = (id: string) =>
  axios.delete(`${controllerUrl}/${id}`);
