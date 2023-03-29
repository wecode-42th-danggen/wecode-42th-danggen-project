const commentDao = require('../models/commentDao');

const createComment = async (cmpostId, content, userId) => {
  return commentDao.createComment(cmpostId, content, userId);
};

const deleteComment = async (commentId) => {
  const check = await commentDao.checkRegisterCommentId(commentId);

  if (!check) {
    const error = new Error('NOT_EXIST_COMMENT');
    error.statusCode = 400;
    throw error;
  }

  return await commentDao.deleteComment(commentId);
};

const getComment = async (cmpostId) => {
  return commentDao.getComment(cmpostId);
};

module.exports = { createComment, deleteComment, getComment };
