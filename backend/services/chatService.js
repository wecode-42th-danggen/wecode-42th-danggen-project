const chatDao = require('../models/chatDao');

const createRoom = async (userId, postId) => {
  return await chatDao.createRoom(userId, postId);
};

const createChat = async (userId, content, roomId) => {
  return await chatDao.createChat(userId, content, roomId);
};

module.exports = {
  createRoom,
  createChat,
};
