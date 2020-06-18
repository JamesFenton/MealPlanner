const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');
const {storageFolder} = require('../config/config');

// initial setup
const mealFile = path.join(storageFolder, 'meals.json');
if (!fsSync.existsSync(mealFile)) {
    console.log('creating meals file');
    fsSync.writeFileSync(mealFile, JSON.stringify([]));
}

// functions
const list = async () => {
    return JSON.parse(await fs.readFile(mealFile));
}

const add = async (meal) => {
    const meals = JSON.parse(await fs.readFile(mealFile));
    meals.push(meal);
    await fs.writeFile(mealFile, JSON.stringify(meals, null, 2));
};

module.exports = {
    list,
    add
}