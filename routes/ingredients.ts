import express from "express";
import { Ingredient, validate } from "../models/ingredient";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await Ingredient.find().sort({ name: 1 });
  res.send(items);
});

router.post("/", auth, async (req, res) => {
  // validate
  const { error } = validate(req.body);

  // if invalid
  if (error) return res.status(400).send(error.details.map(d => d.message));

  // if valid - save
  const ingredient = new Ingredient({
    name: req.body.name
  });
  await ingredient.save();
  res.send(ingredient);
});

router.delete("/:id", auth, async (req, res) => {
  const item = await Ingredient.findByIdAndDelete(req.params.id);
  res.send(item);
});

export default router;
