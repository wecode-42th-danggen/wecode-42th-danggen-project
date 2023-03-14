const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

const { upload } = require('../utils/imageUplodaer');

router.post('/', upload.single('img'), postController.createPost);
router.patch('/hide/:postId', postController.hidePost);
router.patch('/unhide/:postId', postController.unhidePost);
router.patch('/pullup/:postId', postController.pullUpPost);
router.patch('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
