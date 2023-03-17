const chatService = require('../services/chatService');
const { catchAsync } = require('../utils/error');

const socketMessage = (io) => {
  io.on('connection', (socket) => {
    console.log('A User Connected.');

    socket.on(
      'create_room',
      catchAsync(async (userId, postId, callback) => {
        const room = await chatService.createRoom(userId, postId);
        socket.join(room.raw.insertId);
        callback(room.raw.insertId);
      })
    );

    socket.on(
      'enter_room',
      catchAsync(async (roomId, callback) => {
        socket.join(roomId);
        callback(roomId);
      })
    );

    socket.on('new_text', async (userId, content, roomId, callback) => {
      const chat = await chatService.createChat(userId, content, roomId);
      socket.to(roomId).emit('new_text', content);
      callback(content);
    });

    socket.on('disconnect', () => {
      console.log('접속이 해제되었습니다', ip, socket.id);
      clearInterval(socket.interval);
    });

    socket.on('error', (error) => {
      console.error(error);
    });

    socket.on('send', (data) => {
      console.log(data);
      socket.emit('reply', {
        data,
      });
    });

    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, process.env.SOCKET_PORT);
  });
};

module.exports = { socketMessage };
