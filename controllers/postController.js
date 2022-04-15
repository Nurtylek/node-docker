const Post = require('../models/postModel');

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200).json({
                posts: posts
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.getPost = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: 'Post not found'
                });
            }
            res.status(200).json({
                post: post
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added successfully',
                postId: createdPost._id
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.updatePost = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: 'Post not found'
                });
            }
            post.title = req.body.title;
            post.content = req.body.content;
            return post.save()
                .then(result => {
                    res.status(200).json({
                        message: 'Post updated',
                        postId: result._id
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.deletePost = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: 'Post not found'
                });
            }
            return post.remove()
                .then(result => {
                    res.status(200).json({
                        message: 'Post deleted'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
