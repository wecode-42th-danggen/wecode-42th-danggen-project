const express = require('express');

const router = express.Router();
const commentController = require('../controllers/commentController');
const { checkValidationToken } = require('../middlewares/auth');

router.post(
  '/:cmpostId',
  checkValidationToken,
  commentController.createComment
);
router.delete(
  '/:commentId',
  checkValidationToken,
  commentController.deleteComment
);

router.get('/:cmpostId', commentController.getComment);

module.exports = { router };
