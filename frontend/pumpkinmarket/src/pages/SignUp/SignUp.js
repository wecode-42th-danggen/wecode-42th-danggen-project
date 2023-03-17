import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [imgFile, setImgFile] = useState('');
  const [signupInfo, setSignupInfo] = useState({
    phoneNumber: '',
    nickName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const getSignupInfo = event => {
    const { name, value } = event.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };
  console.log(signupInfo);
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const submitUser = e => {
    e.preventDefault();
    fetch('http://192.168.0.191:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: '',
      },
      body: JSON.stringify({
        phoneNumber: signupInfo.phoneNumber,
        nickName: signupInfo.nickName,
        email: signupInfo.email,
        password: signupInfo.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(signupInfo);
        navigate('/');
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
          <div class="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full"
              src={
                imgFile
                  ? imgFile
                  : `https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80`
              }
              alt="Current profile photo"
            />
          </div>
          <span className="sr-only">Choose profile photo</span>
          <label for="avatar">Avatar</label>
          <input
            type="file"
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700

      


      hover:file:bg-violet-10 mb-5
      
            name="profile_image_url"

            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />

          <input

            placeholder="email"
            type="email"
            name="email"
            className="mb-5"
          ></input>
          <input

            placeholder="name"
            type="name"
            name="name"
            className="mb-5"

          ></input>
          
          <input
            type="submit"
            value="signUp"
            className="w-44 bg-green-500 rounded-lg"




          ></input>
          <input
            placeholder="password"
            type="password"
            name="password"
            className="mb-5"

            onChange={getSignupInfo}

          ></input>
          
<input
            name="phoneNumber"
            className="mb-5"
            onChange={getSignupInfo}
          ></input>
          <button
            type="submit"
            className="w-44 bg-green-500 rounded-lg text-slate-50"
            onClick={submitUser}
          >
            signUp
          </button>

        </form>
      </div>
    </div>
  );
}
