const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    ingredients: [{ingredientId: mongoose.ObjectId, quantity: Number}]
});

const model = mongoose.model('Meal', schema);

module.exports = model;
