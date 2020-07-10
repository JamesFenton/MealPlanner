import express from 'express';
import config from './config';

const auth = require('./routes/auth');
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

// check config
if (!config.jwtPrivateKey) {
  console.error("jwtPrivateKey not set");
  process.exit(1);
}

// routes
const app = express();
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/ingredients', ingredients);
app.use('/api/meals', meals);

// run
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
