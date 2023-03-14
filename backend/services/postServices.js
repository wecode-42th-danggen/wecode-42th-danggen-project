const postDao = require('../models/postDao');

const createPost = async (
  userId,
  title,
  price,
  description,
  priceSuggestion,
  categoryId
) => {
  return await postDao.createPost(
    userId,
    title,
    price,
    description,
    priceSuggestion,
    categoryId
  );
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

module.exports = {
  createPost,
  updatePost,
};
