import express from "express";
import _ from "lodash";
import { Meal } from "../models/meal";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", async (req, res) => {
  const meals = await Meal.find().sort({ name: 1 });

  res.send(meals);
});

router.get("/:id", async (req, res) => {
  const meal = await Meal.findById(req.params.id).populate(
    "ingredients.ingredient"
  );

  // flatten
  const dto = meal.toObject();
  dto.ingredients = _(meal.ingredients)
    .map((i) => {
      return {
        ...i.ingredient.toObject(),
        quantity: i.quantity,
      };
    })
    .orderBy((x) => x.name)
    .value();

  res.send(dto);
});

router.post("/", auth, async (req, res) => {
  const { _id, name, ingredients } = req.body;
  let meal;
  if (_id) {
    meal = await Meal.findByIdAndUpdate(_id, {
      name: name,
      ingredients: ingredients,
    });
  } else {
    meal = new Meal({
      name: req.body.name,
      ingredients: req.body.ingredients,
    });
    await meal.save();
  }
  res.send(meal);
});

export default router;
