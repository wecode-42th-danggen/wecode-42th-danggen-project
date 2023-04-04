const chatDao = require('../models/chatDao');

const getChatRoomsByRoomId = async (roomId) => {
  return await chatDao.getChatRoomsByRoomId(roomId);
};

module.exports = { getChatRoomsByRoomId };
