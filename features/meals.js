const Joi = require('joi');
const mealsRepo = require('../infrastructure/meals-repo');

const list = async (req, res) => {
    const meals = await mealsRepo.list();
    res.send(meals);
}

const add = async (req, res) => {
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
    if (error) {
        res.status(400).send(error.details.map(d => d.message));
        return;
    }

    // if valid - save
    const meal = {
        name: req.body.name,
        ingredients: req.body.ingredients
    };
    await mealsRepo.add(meal);

    res.send(meal);
}

module.exports = {
    list,
    add
}