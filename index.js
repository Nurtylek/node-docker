const express = require('express');
const mongoose = require('mongoose');
const {MONGO_URL} = require("./config/config");

const app = express();

mongoose.connect(`${MONGO_URL}?authSource=admin`).then(() => {
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
