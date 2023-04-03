import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './chat.css';

const Chat = () => {
  const [productData, setProductData] = useState([]);
  const [postId, setPostId] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState([]);
  const [userInfoData, setUserInfoData] = useState({});
  console.log('userInfoData::', userInfoData);
  const navigate = useNavigate();

  const params = useParams();
  const Token = localStorage.getItem('accessToken');

  const nameValue = document.querySelector('#hiddenInputValue');
  const chatList = document.querySelector('.chatting-list');
  const sendNicknames = userInfoData.nickname;
  console.log('sendNicknames:', sendNicknames); // 오이
  console.log('nameValue:', nameValue);

  if (!Token) {
    console.error('Access token not found.');
  }

  const socket = io.connect('http://192.168.0.194:4000', {
    withCredentials: true,
    extraHeaders: {
      Authorization: Token,
    },
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  const handleCreateRoom = event => {
    event.preventDefault();
    if (socket) {
      socket.emit('create_room', postId, postId => {
        console.log('postId:', postId);
      });
    }
  };

  socket.on('create_room', roomId => {
    setRoomId(roomId);
    console.log('룸아이디:', roomId);
  });

  const handleJoinRoom = roomId => {
    socket.emit('enter_room', roomId, roomId => {
      console.log(`Joined room ${roomId}`);
      handleNewText(roomId);
    });
  };

  const handleNewText = event => {
    event.preventDefault();
    const inputText = document.querySelector('.chatting-input');
    const content = inputText.value;
    const nickname = userInfoData.nickname;
    console.log('nickname::', nickname);
    inputText.value = '';
    console.log(`roomId: ${roomId}`);
    const paramsVal = JSON.stringify({
      name: nickname,
      msg: content,
      roomId: `${roomId}`,
    });

    socket.emit('new_text', content, roomId, nickname, response => {
      setMessages(prevMessages => [...prevMessages, JSON.parse(paramsVal)]);
    });
  };

  socket.on('new_text', data => {
    const { content, roomId, nickname, time } = data;
    const item = new LiModel(content, roomId, nickname, time);
    const makeLi = item.makeLi.bind(item);
    makeLi();
    const displayContainer = document.querySelector('.displayContainer');
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
  });

  function LiModel(content, roomId, nickname, time) {
    this.name = nickname;
    this.msg = content;
    this.roomId = roomId;
    this.time = time;

    function makeLi() {
      const sendNickname = sendNicknames;
      const li = document.createElement('li');
      li.classList.add(sendNickname === this.name ? 'sent' : 'received');
      const date = new Date(this.time);
      const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const dom = `
        <div className="message-row__content">
          <div className="message__info">
          <img 
          className="userImg"
          src=${
            userInfoData.profileImageUrl === null
              ? '/images/Nav/profile.png'
              : userInfoData.profileImageUrl
          } />

            <span className="message__bubble message">${this.msg}</span>
            <span className="message__time time" id="clock">
             ${timeString}
            </span>
          </div>
        </div>`;
      li.innerHTML = dom;
      chatList?.appendChild(li);
    }

    return { makeLi: makeLi.bind(this) };
  }

  const onCheckEnter = e => {
    if (e.key === 'Enter') {
      Chat();
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
        console.log('nickname:', data.data[0]?.postInfo[0].nickname);
        setProductData(data.data);
        setPostId(data.data[0]?.postInfo[0].id);
      });
  }, [params.id]);

  useEffect(() => {
    fetch(`http://192.168.0.194:4000/users/image`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserInfoData(data);
      });
  }, []);

  return (
    <div className="h-screen pt-36 h-screen overflow-scroll">
      <div className="text-2xl ml-10 border-b-2">
        <button className="mr-5  mb-5" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <input
          id="hiddenInputValue"
          className="hidden hiddenInputValue"
          // value={sendNicknames}
          defaultValue={sendNicknames}
        />
        <div className="mr-5 mb-5">{productData[0]?.postInfo[0].nickname}</div>
      </div>
      <div className="flex border-solid border-b-2 pb-3 m-4">
        <img
          className="w-11 rounded-md ml-5"
          src={productData[0]?.postInfo[0].imageUrl}
          alt="img"
        />
        <h3 className="m-2.5">{productData[0]?.postInfo[0].title}</h3>
      </div>
      <button onClick={handleCreateRoom}>방 만들기</button>
      <button onClick={() => handleJoinRoom(roomId)}>입장하기</button>
      <header className="alt-header">
        <div className="alt-header-column">
          <span>
            <i className="fas fa-search fa-lg" />
          </span>
          <span>
            <i className="fas fa-bars fa-lg" />
          </span>
        </div>
      </header>

      <main className="main-screen main-chat h-screen overflow-scroll">
        <div className="message-col">
          <ul className="chatting-list flex flex-col">
            {/* <img src={productData[0]?.postInfo[0].imageUrl} /> */}
          </ul>
        </div>

        <div className="message-row message-row--own">
          <div className="message__info">
            <span className="message__bubble">What's up?</span>
            <span className="message__time">21:27</span>
          </div>
        </div>
      </main>

      <form className="reply">
        <div className="reply__column">
          <i className="far fa-plus-square fa-lg" />
        </div>
        <div className="reply__column">
          <input
            type="text"
            placeholder="Write a message..."
            className="chatting-input"
            onKeyDown={onCheckEnter}
          />
          <button className="reply__Btn" onClick={handleNewText}>
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
