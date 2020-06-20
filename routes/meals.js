const express = require('express');
const router = express.Router();

const Joi = require('joi');
const mealsRepo = require('../infrastructure/meals-repo');

router.get('/', async (req, res) => {
    const meals = await mealsRepo.list();
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
    const {error} = mealSchema.validate(req.body);

    // if invalid
    if (error) return res.status(400).send(error.details.map(d => d.message));

    // if valid - save
    const meal = {
        name: req.body.name,
        ingredients: req.body.ingredients
    };
    await mealsRepo.add(meal);

    res.send(meal);
});

module.exports = router;