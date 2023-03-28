const chatDao = require('../models/chatDao');
const { catchAsync } = require('../utils/error');

const createRoom = catchAsync(async (req, res) => {
  const userId = req.user;
  const postId = req.params;

  const newRoom = await chatDao.createRoom(userId, postId);

  const io = req.app.get('io');
  console.log(io);
  io.of('/room').emit('newRoom', newRoom);
  return res.redirect(`/room/${newRoom.id}`);
});

const enterRoom = catchAsync(async (req, res) => {
  return await chatDao.createRoom(userId, postId);
});

const createChat = catchAsync(async (userId, content, roomId) => {
  const userId = req.user;
  const roomId = req.params;
  const content = req.body;

  return await chatDao.createChat(userId, content, roomId);
});

module.exports = { createRoom, createChat };
