const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');
const postController = require('../controllers/postController');
const { createPostValidator, updatePostValidator } = require('../validators/postValidator');
const router = express.Router();

router.post('/', auth, createPostValidator, validate, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', auth, postController.getPostById);
router.put('/:id', auth, validate, updatePostValidator, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
