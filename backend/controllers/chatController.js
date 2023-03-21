const chatService = require('../services/chatService');
const { catchAsync } = require('../utils/error');

const createRoom = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  await chatService.createRoom(userId, postId);

  return res.status(201).json({ message: 'Create Chat Rooms Successfully' });
});

// const socketMessage = catchAsync(async (req, res) => {
//   const message = req.body.message;

//   await chatService.socketMessage(message);

//   return res.status(200).json({ message: 'Server Connected Successfully!' });
// });

module.exports = {
  // socketMessage,
  createRoom,
};
