import React, { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

export default function Waem() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const getUserInfo = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const waemLogin = e => {
    cookies.set('my-cookie', 'hello', {
      maxAge: 60000000,
      secure: true,
      httpOnly: false,
      sameSite: 'none',
    });

    e.preventDefault();
    //와임 로그인 API 192.168.0.195로 등록 되어 있음
    fetch('http://192.168.0.195:3000/users/waemsignin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken == null) {
          alert('아이디 혹은 비밀번호 확인해주세요.');
        } else {
          alert('로그인 되었습니다');
          localStorage.setItem('accessToken', data.accessToken);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err.messages);
      });
  };
  return (
    <div>
      <div className="flex justify-center ">
        <div className="flex justify-center leading-10 h-screen align-items: center;">
          <form
            className="flex flex-col space-x-6 justify-center items-center"
            encType="multipart/form-data"
            method="POST"
            action="login"
          >
            <h1 className="font-bold m-5 text-xl">💝 문情</h1>
            <input
              placeholder="email"
              type="email"
              name="email"
              className="ml-7 mb-7 border-solid border-2 border-slate-100 rounded-md pl-2"
              onChange={getUserInfo}
              autoComplete="on"
            />
            <div>
              <button
                type="submit"
                onClick={waemLogin}
                className="w-32 bg-green-500 rounded-lg text-slate-50 mr-2"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
