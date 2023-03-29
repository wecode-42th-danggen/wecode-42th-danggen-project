import React, { useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './chat.css';
import { MenuContext } from '../../components/Nav/MenuProvider';

const Chat = () => {
  const [searchId, setSearchId] = useContext(MenuContext);
  const [productData, setProductData] = useState([]);
  const [postId, setPostId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState([]);

  // console.log('productData::', productData);

  const params = useParams();
  const Token = localStorage.getItem('accessToken');

  const socket = io.connect('http://192.168.0.194:4000', {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${Token}`,
    },
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
  // socket.on('connection', () => {
  //   console.log('Connected to server');
  // });
  // if (socket.connected) {
  //   console.log('소켓이 연결되었습니다.');
  // } else {
  //   console.log('소켓이 연결되지 않았습니다.');
  // }

  if (!Token) {
    console.error('Access token not found.');
  }

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  // console.log('searchId: ', searchId);

  // const searchData = searchId.map(item => item.id);
  // console.log('searchData:', searchData);
  // console.log('postId:', postId);

  const addMessage = message => {
    setMessages([...messages, message]);
  };

  const handleCreateRoom = event => {
    event.preventDefault();
    socket.emit('create_room', postId, postId => {
      console.log('postId:', postId);
    });
  };
  socket.on('create_room', roomId => {
    setRoomId(roomId);
    console.log('룸아이디:', roomId);
  });
  // // const sendMessage = () => {
  // //   socket.emit('create_room', { message: 'Hello' });
  // // };

  const handleJoinRoom = roomId => {
    socket.emit('enter_room', roomId, roomId => {
      console.log(`Joined room ${roomId}`);
    });
  };

  const handleNewText = event => {
    event.preventDefault();
    const inputText = document.getElementById('input-text');
    const content = inputText.value;
    inputText.value = '';
    console.log(`roomId: ${roomId}`);
    socket.emit('new_text', content, roomId, response => {
      console.log(`Sent message: ${response.message}`);
      addMessage(response.message);
    });
  };

  const onCheckEnter = e => {
    if (e.key === 'Enter') {
      handleNewText();
    }
  };

  useEffect(() => {
    fetch(`http://192.168.0.194:4000/posts?postId=${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: Token,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProductData(data.data);
        setPostId(data.data[0]?.postInfo[0].id);
      });
  }, [params.id]);

  console.log('아래 postId:', postId);

  return (
    <>
      <div className="h-screen pt-36">
        <div className="flex border-solid border-b-2 pb-3">
          <img
            className="w-11 rounded-md ml-5"
            src={productData[0]?.postInfo[0].imageUrl}
            alt="img"
          />
          <h3 className="m-2.5">{productData[0]?.postInfo[0].title}</h3>
        </div>
        <button onClick={handleCreateRoom}>테스트</button>
        <button onClick={() => handleJoinRoom(roomId)}>테스트2</button>
        <header className="alt-header">
          <div className="alt-header-column">
            <span>
              <i className="fas fa-search fa-lg"></i>
            </span>
            <span>
              <i className="fas fa-bars fa-lg"></i>
            </span>
          </div>
        </header>

        <main className="main-screen main-chat">
          <div className="message-row">
            <img src={productData[0]?.postInfo[0].imageUrl} />
            <div className="message-row__content">
              <span className="message__author">Panda</span>
              <div className="message__info">
                <span className="message__bubble bubble__Gray">Hi!</span>
                <span className="message__time" id="clock">
                  00:00
                </span>
              </div>
            </div>
          </div>

          <div className="message-row message-row--own">
            <div className="message__info">
              <span className="message__bubble bubble__peach">What's up?</span>
              <span className="message__time">21:27</span>
            </div>
          </div>
        </main>

        <form className="reply">
          <div className="reply__column">
            <i className="far fa-plus-square fa-lg"></i>
          </div>
          <div className="reply__column">
            <input
              type="text"
              placeholder="Write a message..."
              id="input-text"
              onKeyDown={onCheckEnter}
            />
            <button className="reply__Btn" onClick={handleNewText}>
              전송
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
