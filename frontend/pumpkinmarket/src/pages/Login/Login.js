import React, { useState } from 'react';

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
            className="ml-7 mb-5"
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            className="mb-5"
          ></input>
          <input
            type="submit"
            value="Login"
            className="w-44 bg-green-500 rounded-lg"
          ></input>
        </form>
      </div>
    </div>
  );
}
