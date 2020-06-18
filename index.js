const express = require('express');
const app = express();
const meals = require('./controllers/meals');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/api/meals', meals.list);
app.post('/api/meals', meals.add);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
