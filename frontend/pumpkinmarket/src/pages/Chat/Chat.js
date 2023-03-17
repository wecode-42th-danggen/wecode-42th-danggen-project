import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

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
  componentWillMount(){
    socket.emit("roomjoin", this.state.email);
  };
    socket.on("heejewake", (message) => {
      alert(message);
    });
  }
  render() {
    return <div></div>;
  }
  onclick = (e) => {
    const str = "hwi";
    socket.emit("alert", str);
    render() {
      return (
        <div>
          <button onclick={this.onclick}>알림창 보내기</button>
        </div>
      )
    };
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
