import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const getUserInfo = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const goToMain = e => {
    e.preventDefault();
    fetch('http://192.168.0.195:3000/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.accessToken);
        if (data.accessToken == null) {
          alert('아이디 혹은 비밀번호 확인해주세요.');
        } else {
          alert('로그인 되었습니다');
          window.localStorage.setItem('accessToken', data.accessToken);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err.messages);
      });
  };

  return (
    <div className="flex justify-center ">
      <div className="flex justify-center leading-10 h-screen align-items: center;">
        <form
          className="flex flex-col space-x-6 justify-center items-center"
          encType="multipart/form-data"
          method="POST"
          action="login"
        >
          <input
            placeholder="email"
            type="email"
            name="email"
            className="ml-7 mb-7"
            onChange={getUserInfo}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            className="mb-7"
            onChange={getUserInfo}
          />

          <button type="submit" onClick={goToMain}>
            Login!
          </button>
        </form>
      </div>
    </div>
  );
}
