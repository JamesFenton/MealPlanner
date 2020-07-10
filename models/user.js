const mongoose = require('mongoose');
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    maxlength: 100
  },
  email: {
    type: String, 
    required: true, 
    unique: true,
    minlength: 5,
    maxlength: 100
  },
  passwordHash: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 1024}
});

function validate(user) {
  const schema = {
    name: Joi.string().required().max(100),
    email: Joi.string().required().min(5).max(100).email(),
    password: Joi.string().required().min(5).max(100),
  }

  return Joi.validate(user, schema);
}

const model = mongoose.model('User', schema);

exports.User = model;
exports.validate = validate;