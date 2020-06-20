const express = require('express');
const app = express();
const meals = require('./routes/meals');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/meals', meals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
