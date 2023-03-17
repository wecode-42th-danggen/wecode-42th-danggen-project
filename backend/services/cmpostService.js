const cmpostDao = require('../models/cmpostDao');

const createCmpost = async (imageUrl, cmpostInfo) => {
  return cmpostDao.createCmpost(imageUrl, cmpostInfo);
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

module.exports = { createCmpost, updateCmpost, deleteCmpost };