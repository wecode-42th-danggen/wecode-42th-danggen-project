import React, { useState, useRef } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({ id: '', password: '' });
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
          <input type="submit" value="제출"></input>
        </form>
      </div>
    </div>
  );
}
