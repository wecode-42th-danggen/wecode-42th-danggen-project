import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [data, setData] = useState([]);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    fetch(`http://43.201.49.236:3100/chats`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
      });
  }, []);

  // 서버의 URL
  const SERVER_URL = 'http://43.201.49.236:3100';

  // 소켓 연결
  const socket = io(SERVER_URL);

  const handleCreateRoom = () => {
    socket.emit('create_room', postId, ({ postId, roomId }) => {
      console.log(`Joined room ${roomId}`);
      setRoomId(roomId);
    });
  };

  const handleJoinRoom = roomId => {
    socket.emit('enter_room', roomId, roomId => {
      console.log(`Joined room ${roomId}`);
      setRoomId(roomId);
    });
  };

  const handleNewText = content => {
    socket.emit('new_text', content, roomId, content => {
      console.log(`Sent message: ${content}`);
    });
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>Create Room</button>
      {data.map(chat => (
        <div key={chat.id}>{chat.content}</div>
      ))}
      {roomId && (
        <div>
          <input type="text" onChange={e => handleNewText(e.target.value)} />
          <button onClick={() => handleJoinRoom(roomId)}>Join Room</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
