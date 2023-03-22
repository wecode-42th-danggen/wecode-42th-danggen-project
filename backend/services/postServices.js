const postDao = require('../models/postDao');

const createPost = async (
  image,
  title,
  price,
  description,
  categoryId,
  priceSuggestion,
  location,
  userId
) => {
  return await postDao.createPost(
    image,
    title,
    price,
    description,
    categoryId,
    priceSuggestion,
    location,
    userId
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

const getPosts = async (postId, title, location, cookie) => {
  if (cookie && postId) {
    const viewObj = new Object();
    const [currentViews] = await postDao.getPostViewsByPostId(postId);
    let updatedViews = currentViews.viewCount;

    if (postId) {
      if (!viewObj[postId]) {
        viewObj[postId] = [];
      }

      if (viewObj[postId].indexOf(cookie) == -1) {
        viewObj[postId].push(cookie);
        updatedViews += 1;
        await postDao.addPostViewCount(updatedViews, postId);
      }
    }
  }

  return await postDao.getPosts(postId, title, location);
};

const createLike = async (userId, postId) => {
  return await postDao.createLike(userId, postId);
};

const cancelLike = async (userId, postId) => {
  return await postDao.cancelLike(userId, postId);
};

module.exports = {
  createPost,
  updatePost,
  hidePost,
  unhidePost,
  pullUpPost,
  deletePost,
  getPosts,
  createLike,
  cancelLike,
};
