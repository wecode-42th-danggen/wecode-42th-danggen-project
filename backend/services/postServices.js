const postDao = require('../models/postDao');

const viewObj = new Object();

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

const getPosts = async (postId, keyword, cookie) => {
  if (cookie && postId) {
    const [currentViews] = await postDao.getPostViewsByPostId(postId);
    let updatedViews = currentViews.viewCount;

    if (postId) {
      if (!viewObj[postId]) {
        viewObj[postId] = [];
        console.log('뷰오브젝트: ', viewObj);
      }

      if (viewObj[postId].indexOf(cookie) == -1) {
        viewObj[postId].push(cookie);
        updatedViews += 1;

        await postDao.addPostViewCount(updatedViews, postId);
      }
    }
  }

  return await postDao.getPosts(postId, keyword);
};

const createLike = async (userId, postId) => {
  const isliked = await postDao.getLikeStatus(userId, postId);

  if (isliked) {
    const error = new Error('Already Liked Post. Please Remove Like First.');
    error.statusCode = 409;
    throw error;
  }

  return await postDao.createLike(userId, postId);
};

const cancelLike = async (userId, postId) => {
  return await postDao.cancelLike(userId, postId);
};

const getLikeStatus = async (userId, postId) => {
  return await postDao.getLikeStatus(userId, postId);
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
  getLikeStatus,
};
