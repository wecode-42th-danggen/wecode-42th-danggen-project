import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const getUserInfo = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const goToMain = () => {
    fetch('http://10.58.52.55:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        password: formData.password,
        email: formData.email,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigate('/');
      })
      .catch(err => {
        console.log(err.messages);
      });
  };
  return (
    <div className="flex justify-center ">
      <div className="flex justify-center leading-10 h-screen align-items: center;">
        <form
          className="flex flex-col space-x-6 justify-center items-center "
          encType="multipart/form-data"
          method="POST"
          action="login"
        >
          <input
            placeholder="email"
            type="email"
            name="profile_image_url"
            className="ml-7 mb-7"
            onChange={getUserInfo}
          ></input>
          <input
            placeholder="password"
            type="password"
            name="password"
            className="mb-7"
            onChange={getUserInfo}
          ></input>
          <button type="submit" onClick={goToMain}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
