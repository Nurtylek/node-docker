const User = require('../models/userModel');
const bc = require('bcryptjs');

exports.signup = async (req, res, next) => {
    const password = await bc.hash(req.body.password, 12);
    const username = req.body.username;
    const user = new User({
        password,
        username
    });
    user.save()
        .then(result => {
            req.session.user = user;
            res.status(201).json({
                message: 'User created!',
                result: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'User creation failed!',
                error: err
            });
        });
};

exports.login = async (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bc.compare(req.body.password, user.password).then(result => {
                if (!result) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                req.session.user = user;
                res.status(200).json({
                    message: 'Auth successful',
                    userId: user._id,
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Auth failed',
                error: err
            });
        });
};

exports.getAllUsers = async (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).json({
                message: 'Users fetched successfully!',
                users: users
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Fetching users failed!',
                error: err
            });
        });
};
