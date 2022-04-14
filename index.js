const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://admin:admin@mongo:27017/?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
});

const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
    res.send('<h2>Hello World!!!</h2>');
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
