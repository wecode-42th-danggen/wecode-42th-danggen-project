const chatService = require('../services/chatService');
const { catchAsync } = require('../utils/error');

const getChatRoomsByRoomId = catchAsync(async (req, res) => {
  const { roomId } = req.params;

  [data] = await chatService.getChatRoomsByRoomId(roomId);

  return res.status(200).json({ data });
});

module.exports = {
  getChatRoomsByRoomId,
};
