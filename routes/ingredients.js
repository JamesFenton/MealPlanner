const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Ingredient = require('../models/ingredient');

router.get('/', async (req, res) => {
  const items = await Ingredient
      .find()
      .sort({name: 1});

  res.send(items);
});

router.post('/', async (req, res) => {
  // validate
  const schema = Joi.object({
      name: Joi.required().string().min(3).max(25)
  });
  const {error} = schema.validate(req.body);

  // if invalid
  if (error) return res.status(400).send(error.details.map(d => d.message));

  // if valid - save
  const ingredient = new Ingredient({
      name: req.body.name
  });
  await ingredient.save();

  res.send(ingredient);
});

module.exports = router;