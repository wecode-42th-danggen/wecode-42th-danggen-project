const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

const { upload } = require('../utils/imageUplodaer');

router.post('/', upload.single('image'), postController.createPost);
router.patch('/hide/:postId', postController.hidePost);
router.patch('/unhide/:postId', postController.unhidePost);
router.patch('/pullup/:postId', postController.pullUpPost);
router.get('/', postController.getPosts);
router.post('/likes/:postId', postController.createLike);
router.delete('/likes/:postId', postController.cancelLike);
router.patch('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);
router.post('/like/:postId', postController.createLike);

module.exports = router;
