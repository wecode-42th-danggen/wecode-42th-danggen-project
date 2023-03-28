const chatDao = require('../models/chatDao');
const { catchAsync } = require('../utils/error');

const socketMessage = (io) => {
  const room = io.of('/room');
  const chat = io.of('/chat');

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');

    socket.on('join', (data) => {
      socket.join(data);
      socket.to(data).emit('join', {
        user: 'system',
        chat: `${socket.request.session.color}님이 입장하셨습니다.`,
      });
    });

    socket.on('disconnect', async () => {
      console.log('chat 네임스페이스 접속 해제');
      const { referer } = socket.request.headers; // 브라우저 주소가 들어있음
      const roomId = new URL(referer).pathname.split('/').at(-1);
      const currentRoom = chat.adapter.rooms.get(roomId);
      const userCount = currentRoom?.size || 0;
      if (userCount === 0) {
        // 유저가 0명이면 방 삭제
        await removeRoom(roomId); // 컨트롤러 대신 서비스를 사용
        room.emit('removeRoom', roomId);
        console.log('방 제거 요청 성공');
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${socket.request.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
  });

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('새로운 유저 접속!', '[ip:]', ip, '[소켓 아이디:]', socket.id);

    socket.on(
      'create_room',
      catchAsync(async (postId, callback) => {
        const room = await chatDao.createRoom(userId, postId);
        socket.join(room.raw.insertId);
        callback(room.raw.insertId);
        socket.emit('create_room', room.raw.insertId);
      })
    );

    socket.on(
      'enter_room',
      catchAsync(async (roomId, callback) => {
        socket.join(roomId);
        callback(roomId);
      })
    );

    socket.on('new_text', async (content, roomId, callback) => {
      await chatDao.createChat(userId, content, roomId);
      socket.to(roomId).emit('new_text', content);
      callback(content);
    });

    socket.on('disconnect', () => {
      console.log('접속이 해제되었습니다', socket.id);
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
    }, process.env.SOCKET_INTERVAL || 1000);
  });
};

module.exports = { socketMessage };
