const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {User, validate} = require('../models/user');
const config = require("../config");

const createLoginResponse = (user, res) => {
  const jwtPayload = {
    id: user.id,
    name: user.name
  };
  const token = jwt.sign(jwtPayload, config.jwtPrivateKey);
  return res.header('x-access-token', token).sendStatus(200);
}

router.post('/login', async (req, res) => {
  const errorMessage = "Invalid login";
  const user = await User.findOne({email: req.body.email});
  if (!user)
    return res.status(400).send(errorMessage);

  const validPassword = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!validPassword)
    return res.status(400).send(errorMessage);

  return createLoginResponse(user, res);
});

router.post('/register', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details);

  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User already registered");

  const {name, email, password} = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  user = new User({
    name,
    email,
    passwordHash
  });
  await user.save();

  return createLoginResponse(user, res);
});

module.exports = router;