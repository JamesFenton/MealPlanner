import express from "express";
import { Ingredient } from "../models/ingredient";
import { Meal } from "../models/meal";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", async (req, res) => {
  const meals = await Meal.find()
    .populate("ingredients.ingredient")
    .sort({ name: 1 });

  res.send(meals);
});

router.post("/", auth, async (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    ingredients: req.body.ingredients
  });
  await meal.save();
  res.send(meal);
});

export default router;
