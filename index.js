const express = require('express');
const mongoose = require('mongoose');
const {MONGO_URL} = require("./config/config");
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({limit: '50mb', urlencoded: true}));

mongoose.connect(`${MONGO_URL}?authSource=admin`).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB:', error.message);
});

const port = process.env.PORT ?? 3000;

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', authRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
