import express from 'express';
import {Ingredient} from '../models/ingredient';
import {Meal} from '../models/meal';

const router = express.Router();

router.get('/', async (req, res) => {
  const meals = await Meal
      .find()
      .populate('ingredients.ingredient')
      .sort({name: 1});

  res.send(meals);
});

router.post('/', async (req, res) => {
  const ingredientIds = req.body.ingredients.map(i => i.ingredient);
  // todo ensure ingredient IDs exist in DB
  const validIngredientCount = await Ingredient
    .where('_id')
    .in(ingredientIds)
    .countDocuments();
  
  if (validIngredientCount !== ingredientIds.length) 
    return res.status(400).send("Invalid ingredient sent");

  try {
    const meal = new Meal({
        name: req.body.name,
        ingredients: req.body.ingredients
    });
    await meal.save();
    res.send(meal);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;