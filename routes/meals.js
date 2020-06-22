const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Meal = require('../models/meal');

router.get('/', async (req, res) => {
    const meals = await Meal
        .find()
        .sort({name: 1});

    res.send(meals);
});

router.post('/', async (req, res) => {
    // validate
    const ingredientSchema = Joi.object({
        quantity: Joi.number().required(),
        name: Joi.string().min(3).max(25)
    });
    const mealSchema = Joi.object({
        name: Joi.string().required().min(3).max(25),
        ingredients: Joi.array().items(ingredientSchema)
    });
    //const {error} = mealSchema.validate(req.body);

    // if invalid
    //if (error) return res.status(400).send(error.details.map(d => d.message));

    // if valid - save
    const meal = new Meal({
        name: req.body.name,
        ingredients: req.body.ingredients
    });
    await meal.save();

    res.send(meal);
});

module.exports = router;