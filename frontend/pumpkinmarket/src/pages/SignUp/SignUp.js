import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log('setImg' + reader.result);
      setImgFile(reader.result);
    };
  };

  const submitUser = (e, props) => {
    e.preventDefault();
    fetch('http://192.168.0.195:3000/users/signup', {
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
      })
      .catch(error => {
        console.log(error.messages);
      });
  };
  const waringEmail = () => {
    if (
      regexEmail.test(signupInfo.email) === false &&
      signupInfo.email.length > 0
    ) {
      return (
        <div className="text-red-400">이메일 형식이 올바르지 않습니다.</div>
      );
    } else if (regexEmail.test(signupInfo.email) === true) {
      return (
        <div className="text-teal-500">형식에 맞는 이메일주소 입니다!</div>
      );
    } else if (signupInfo.email.length === 0) {
      return null;
    }
  };

  const regexEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

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
              alt="Current profile"
            />
          </div>
          <span className="sr-only">Choose profile photo</span>
          <label htmlFor="avatar">Avatar</label>
          <input
            type="file"
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700

      hover:file:bg-violet-10 mb-5"
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
            className="mb-5 border-solid border-2 border-slate-100 rounded-md"
            onChange={getSignupInfo}
          />
          {waringEmail()}
          <input
            placeholder="nickName"
            type="nickName"
            name="nickName"
            className="mb-5 border-solid border-2 border-slate-100 rounded-md"
            onChange={getSignupInfo}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            className="mb-5 border-solid border-2 border-slate-100 rounded-md"
            onChange={getSignupInfo}
          />
          <input
            placeholder="phoneNumber"
            type="text"
            name="phoneNumber"
            className="mb-5 border-solid border-2 border-slate-100 rounded-md"
            onChange={getSignupInfo}
          />
          <button
            type="submit"
            className="w-44 bg-green-500 rounded-lg text-slate-50"
            onClick={submitUser}
          >
            signUp!
          </button>
        </form>
      </div>
    </div>
  );
}
