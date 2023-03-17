import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const getUserInfo = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
          ></input>
          <input placeholder="password" type="password" name="password"></input>
          <input type="submit" value="제출" onClick={goToMain}></input>
        </form>
      </div>
    </div>
  );
}
