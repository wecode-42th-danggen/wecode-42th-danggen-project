const express = require('express');

const postController = require('../controllers/postController');
const { checkValidationToken } = require('../middlewares/auth');
const { upload } = require('../utils/imageUploader');

const router = express.Router();

router.post(
  '/',
  checkValidationToken,
  upload.array('image'),
  postController.createPost
);
router.patch('/hide/:postId', checkValidationToken, postController.hidePost);
router.patch(
  '/unhide/:postId',
  checkValidationToken,
  postController.unhidePost
);
router.patch(
  '/pullup/:postId',
  checkValidationToken,
  postController.pullUpPost
);
router.get('/', postController.getPosts);
router.post('/likes/:postId', checkValidationToken, postController.createLike);
router.delete(
  '/likes/:postId',
  checkValidationToken,
  postController.cancelLike
);
router.get('/likes/:postId', postController.getLikeStatus);
router.patch('/:postId', checkValidationToken, postController.updatePost);
router.delete('/:postId', checkValidationToken, postController.deletePost);

module.exports = router;
