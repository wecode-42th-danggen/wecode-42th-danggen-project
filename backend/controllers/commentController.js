const commentService = require('../services/commentService');
const { catchAsync } = require('../utils/error');

const createComment = catchAsync(async (req, res) => {
  const { cmpostId } = req.params;
  const { content } = req.body;
  const userId = req.user;
  console.log(userId);

  if (!content) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await commentService.createComment(cmpostId, content, userId);

  res
    .status(201)
    .json({ message: `CREATE_COMMENT_AND_CMPOST_ID : ${cmpostId}` });
});

const deleteComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;

  await commentService.deleteComment(commentId);

  return res.status(200).json({ message: `DELETE_COMMENT` });
});

module.exports = { createComment, deleteComment };
