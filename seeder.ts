import {Ingredient} from './models/ingredient';

const ingredients = [
  new Ingredient({name: 'GF Spaghetti 250g'}),
  new Ingredient({name: 'Beef Mince 500g'}),
  new Ingredient({name: 'Tomatoes Chopped tin'}),
  new Ingredient({name: 'Tomato Puree tin'}),
];

export default async function seed() {
  // ingredients
  const ingredientCount = await Ingredient.countDocuments();
  if (ingredientCount == 0) {
    console.log(`Seeding ${ingredients.length} ingredients`);
    await Promise.all(ingredients.map(i => i.save()));
    console.log("Seeded ingredients");
  }
  console.log("Seeding complete");
}