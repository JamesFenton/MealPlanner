const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  ingredients: [{ingredientId: mongoose.ObjectId, quantity: Number}]
});

const model = mongoose.model('Meal', schema);

module.exports = model;