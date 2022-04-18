const express = require('express');
const postController = require('../controllers/postController');
const protect = require('../middleware/protect');

const router = express.Router();

router.route('/').get(protect, postController.getAllPosts).post(protect, postController.createPost);
router.route('/:id').get(protect, postController.getPost).put(protect, postController.updatePost).delete(protect, postController.deletePost);

module.exports = router;
