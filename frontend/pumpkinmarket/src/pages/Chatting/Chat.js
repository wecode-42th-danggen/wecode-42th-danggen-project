import React, { useState, ReactDOM } from 'react';
import io from 'socket.io-client';

const socket = io();

export const initSocketConnection = () => {
  if (socket) return;
  socket.connect();
};

export default function Chatting() {
  const [chatInput, setChatInput] = useState('');
  const chattingLiElement = document.getElementById('chattingLi');

  const inputOnChange = event => {
    const val = event.target.value;
    setChatInput(val);
    chattingLiElement.append(chatInput);
  };
  return (
    <>
      <ul>
        <li id="chattingLi"></li>
      </ul>
      <input type="text" onChange={inputOnChange} placeholder="입력해주세요" />
    </>
  );
}
