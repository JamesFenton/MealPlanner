import express from "express";
import bcrypt from "bcrypt";
import {User, validate} from '../models/user';
import {accessTokenHeader} from "../middleware/auth";

const router = express.Router();

router.post('/login', async (req, res) => {
  const errorMessage = "Invalid login";
  const user = await User.findOne({email: req.body.email});
  if (!user)
    return res.status(400).send(errorMessage);

  const validPassword = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!validPassword)
    return res.status(400).send(errorMessage);
    
  const token = user.generateAccessToken();
  return res.header(accessTokenHeader, token).sendStatus(200);
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

  const token = user.generateAccessToken();
  return res.header(accessTokenHeader, token).sendStatus(200);
});

export default router;