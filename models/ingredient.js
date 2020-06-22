const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String
});

const model = mongoose.model('Ingredient', schema);

module.exports = model;
