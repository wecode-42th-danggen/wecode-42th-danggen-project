const commentDao = require('../models/commentDao');
const cmpostDao = require('../models/cmpostDao');

const createComment = async (cmpostId, content, userId) => {
  return commentDao.createComment(cmpostId, content, userId);
};

const deleteComment = async (cmpostId, commentId, userId) => {
  const checkCmpost = await cmpostDao.checkCmpostId(cmpostId);
  if (!checkCmpost) {
    const error = new Error('NOT_EXIST_CMPOST');
    error.statusCode = 400;
    throw error;
  }

  const checkComment = await commentDao.checkRegisterCommentId(commentId);
  if (!checkComment) {
    const error = new Error('NOT_EXIST_COMMENT');
    error.statusCode = 400;
    throw error;
  }

  const getUserIdByCommentId = await commentDao.getUserIdByCommentId(commentId);
  if (userId !== getUserIdByCommentId) {
    const error = new Error('NOT_AUTHORIZED_USER');
    error.statusCode = 403;
    throw error;
  }

  return await commentDao.deleteComment(commentId);
};

const getComment = async (cmpostId) => {
  return commentDao.getComment(cmpostId);
};

module.exports = { createComment, deleteComment, getComment };
