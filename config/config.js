module.exports = {
    MONGO_IP: process.env.MONGO_IP || 'mongo',
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@' + process.env.MONGO_IP + ':' + process.env.MONGO_PORT,
};
