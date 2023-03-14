const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.createPost);
router.patch('/hide/:postId', postController.hidePost);
router.patch('/unhide/:postId', postController.unhidePost);
router.patch('/:postId', postController.updatePost);

module.exports = router;
