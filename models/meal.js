const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: String,
    ingredients: [{name: String, quantity: Number}]
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;