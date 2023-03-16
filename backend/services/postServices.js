const postDao = require('../models/postDao');

const createPost = async (image, postInfo) => {
  return await postDao.createPost(image, postInfo);
};

const updatePost = async (
  userId,
  postId,
  title,
  price,
  priceSuggestion,
  description,
  categoryId
) => {
  return await postDao.updatePost(
    userId,
    postId,
    title,
    price,
    priceSuggestion,
    description,
    categoryId
  );
};

const hidePost = async (userId, postId) => {
  return await postDao.hidePost(userId, postId);
};

const unhidePost = async (userId, postId) => {
  return await postDao.unhidePost(userId, postId);
};

const pullUpPost = async (userId, postId) => {
  return await postDao.pullUpPost(userId, postId);
};

const deletePost = async (userId, postId) => {
  return await postDao.deletePost(userId, postId);
};

// const getPostsByCategoryId = async (userId, postId) => {
//   return await postDao.deletePost(userId, postId);
// };

module.exports = {
  createPost,
  updatePost,
  hidePost,
  unhidePost,
  pullUpPost,
  deletePost,
};
