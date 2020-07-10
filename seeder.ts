import {Ingredient} from './models/ingredient';

const ingredients = [
  new Ingredient({name: 'GF Spaghetti 250g'}),
  new Ingredient({name: 'Beef Mince 500g'}),
  new Ingredient({name: 'Tomatoes Chopped tin'}),
  new Ingredient({name: 'Tomato Puree tin'}),
];

async function seed() {
  // ingredients
  const ingredientCount = await Ingredient.countDocuments();
  if (ingredientCount == 0) {
    console.log(`Seeding ${ingredients.length} ingredients`);
    await Promise.all(ingredients.map(i => i.save()));
    console.log("Seeded ingredients");
  }
}

module.exports = seed;