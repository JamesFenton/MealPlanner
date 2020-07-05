const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Ingredient = require('../models/ingredient');
const Meal = require('../models/meal');

router.get('/', async (req, res) => {
  const meals = await Meal
      .find()
      .sort({name: 1});

  res.send(meals);
});

router.post('/', async (req, res) => {
  const ingredientIds = req.body.ingredients.map(i => i.ingredientId);
  // todo ensure ingredient IDs exist in DB
  const validIngredientCount = await Ingredient
    .where('_id')
    .in(ingredientIds)
    .countDocuments();
  console.log(validIngredientCount);
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

module.exports = router;