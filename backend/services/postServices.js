const postDao = require('../models/postDao');

const createPost = async (image, postInfo, userId) => {
  return await postDao.createPost(image, postInfo, userId);
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

const getPosts = async (postId, cookie) => {
  if (cookie) {
    const viewObj = new Object();
    const [currentViews] = await postDao.getPostViewsByPostId(postId);
    let updatedViews;

    if (currentViews.viewCount == null) {
      updatedViews = 0;
    } else {
      updatedViews = currentViews.viewCount;
    }

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

  return await postDao.getPosts(postId);
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
