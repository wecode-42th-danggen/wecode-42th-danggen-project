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

module.exports = { createCmpost, updateCmpost, deleteCmpost, getCmpost };
