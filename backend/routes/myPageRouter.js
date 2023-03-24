const express = require('express');
const router = express.Router();

const myPageController = require('../controllers/myPageController');
const { checkValidationToken } = require('../middlewares/auth');

router.get(
  '/posts',
  checkValidationToken,
  myPageController.getUserPostsByUserId
);
router.get(
  '/likes',
  checkValidationToken,
  myPageController.getUserLikesByUserId
);
router.get(
  '/community-posts',
  checkValidationToken,
  myPageController.getCommunityPostsByUserId
);
router.get(
  '/community-comments',
  checkValidationToken,
  myPageController.getCommunityCommentsByUserId
);
router.get('/chats', checkValidationToken, myPageController.getChatsByUserId);

module.exports = { router };
