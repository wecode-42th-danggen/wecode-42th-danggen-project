const myPageDao = require('../models/myPageDao');

const getUserPostsByUserId = async (userId) => {
  return await myPageDao.getUserPostsByUserId(userId);
};

const getUserLikesByUserId = async (userId) => {
  return await myPageDao.getUserLikesByUserId(userId);
};

const getCommunityPostsByUserId = async (userId) => {
  return await myPageDao.getCommunityPostsByUserId(userId);
};

const getCommunityCommentsByUserId = async (userId) => {
  return await myPageDao.getCommunityCommentsByUserId(userId);
};

const getChatRoomsByUserId = async (userId) => {
  return await myPageDao.getChatRoomsByUserId(userId);
};

const getChatsByUserId = async (userId) => {
  return await myPageDao.getChatsByUserId(userId);
};

module.exports = {
  getUserPostsByUserId,
  getUserLikesByUserId,
  getCommunityPostsByUserId,
  getCommunityCommentsByUserId,
  getChatRoomsByUserId,
  getChatsByUserId,
};
