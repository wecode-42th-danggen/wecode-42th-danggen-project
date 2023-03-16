import React, { useState, useRef } from 'react';

export default function SignUp() {
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
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
          <span class="sr-only">Choose profile photo</span>
          <label for="avatar">Avatar</label>
          <input
            type="file"
            class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            name="avatar"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />

          <input
            placeholder="email"
            type="email"
            name="profile_image_url"
          ></input>
          <input placeholder="name" type="name" name="name"></input>
          <input placeholder="password" type="password" name="password"></input>
          <input placeholder="phone" type="text" name="phone_number"></input>
          <input type="submit" value="Update Profile"></input>
        </form>
      </div>
    </div>
  );
}
