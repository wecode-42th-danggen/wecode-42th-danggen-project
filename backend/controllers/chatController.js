const { Server } = require('socket.io');

const { socketMessage } = require('../middlewares/socket.io');
const { catchAsync } = require('../utils/error');

const socket = catchAsync(async (req, res) => {
  const userId = req.user;

  const io = new Server();
  io.attach(process.env.SOCKET_PORT);

  socketMessage(io, userId);

  return res.status(200).json({ message: 'Server Connected Successfully!' });
});

module.exports = {
  socket,
};
