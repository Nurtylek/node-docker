const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const cors = require('cors');

const {MONGO_URL, REDIS_URL, REDIS_PORT, SESSION_SECRET} = require("./config/config");

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});

const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.enable('trust proxy');
app.use(cors());
app.use(express.json());

app.use(
    session({
        store: new RedisStore({client: redisClient}),
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            httpOnly: true,
            secure: false,
            resave: false,
            saveUninitialized: false,
        },
    })
);

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
