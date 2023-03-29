const cmpostDao = require('../models/cmpostDao');

const createCmpost = async (
  imageUrl,
  title,
  description,
  categoryId,
  userId
) => {
  return cmpostDao.createCmpost(
    imageUrl,
    title,
    description,
    categoryId,
    userId
  );
};

const updateCmpost = async (
  imageUrl,
  title,
  description,
  categoryId,
  postId
) => {
  return cmpostDao.updateCmpost(
    imageUrl,
    title,
    description,
    categoryId,
    postId
  );
};

const deleteCmpost = async (postId) => {
  const checkPostId = await cmpostDao.checkCmpostId(postId);

  if (!checkPostId) {
    const error = new Error('NOT_EXIST_POST');
    error.statusCode = 400;
    throw error;
  }
  return cmpostDao.deleteCmpost(postId);
};

const getCmpost = async (categoryId) => {
  return cmpostDao.getCmpost(categoryId);
};

const getCmpostDetail = async (cmpostId) => {
  return cmpostDao.getCmpostDetail(cmpostId);
};

const createLike = async (userId, cmpostId) => {
  const isLike = await cmpostDao.getLikeStatus(userId, cmpostId);

  if (isLike) {
    const error = new Error('ALREADY_LIKED_POST');
    error.statusCode = 409;
    throw error;
  }

  return await cmpostDao.createLike(userId, cmpostId);
};

const cancelLike = async (userId, cmpostId) => {
  return cmpostDao.cancelLike(userId, cmpostId);
};

const getLikeStatus = async (userId, cmpostId) => {
  return cmpostDao.getLikeStatus(userId, cmpostId);
};

module.exports = {
  createCmpost,
  updateCmpost,
  deleteCmpost,
  getCmpost,
  getCmpostDetail,
  createLike,
  cancelLike,
  getLikeStatus,
};
