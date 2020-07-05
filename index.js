const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');
const ingredients = require('./routes/ingredients');
const meals = require('./routes/meals');
const mongoose = require('mongoose');
const seed = require('./seeder');

// configure DB
mongoose.connect(config.mongoConnectionString, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connected. Seeding.");
  seed();
});

if (config.cors)
  app.use(cors());

// routes
app.use(express.json());

app.use('/api/ingredients', ingredients);
app.use('/api/meals', meals);

// run
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
