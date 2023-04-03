import React, { useEffect, useState } from 'react';
import { API } from '../../config/config';
import UserInfoUpload from './UserInfoUpload';

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [updateUserInfo, setUpdateUserInfo] = useState({
    image: '',
    phoneNumber: '',
    nickName: '',
  });

  const { image } = updateUserInfo;
  const Token = localStorage.getItem('accessToken');

  const handleUpdateNickname = e => {
    const nickName = e.target.value;
    setUpdateUserInfo(prev => ({ ...prev, nickName }));
  };

  const handleUpdatePhoneNum = e => {
    const phoneNumber = e.target.value;
    setUpdateUserInfo(prev => ({ ...prev, phoneNumber }));
  };

  const handleUpdateUserImg = e => {
    e.preventDefault();

    const file = e.target.files[0];
    setUpdateUserInfo(prev => ({ ...prev, image: file }));
  };

  const updateUserInfoForm = new FormData();
  updateUserInfoForm.append('image', updateUserInfo.image);
  updateUserInfoForm.append('phoneNumber', updateUserInfo.phoneNumber);
  updateUserInfoForm.append('nickName', updateUserInfo.nickName);

  useEffect(() => {
    fetch(`${API.USERPROFILEIMG}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  }, []);

  const changeInfo = e => {
    e.preventDefault();

    fetch(`${API.USERS}`, {
      method: 'PATCH',
      headers: {
        enctype: 'multipart/form-data',
        authorization: Token,
      },
      body: updateUserInfoForm,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Update User Info Successfully') {
          alert('회원정보가 변경되었습니다');
        } else {
          alert('회원정보가 변경되지 않았습니다.');
        }
      });
  };
  return (
    <div className="p-32">
      <span className="font-bold text-2xl">회원정보</span>
      <div className="flex flex-col items-center">
        <UserInfoUpload
          image={image}
          handleUpdateNickname={handleUpdateNickname}
          handleUpdatePhoneNum={handleUpdatePhoneNum}
          handleUpdateUserImg={handleUpdateUserImg}
          userInfo={userInfo}
        />
        <button
          type="button"
          onClick={changeInfo}
          className="bg-green-500 text-white rounded-md h-10 w-32 mt-10 ml-24 hover:bg-green-600"
        >
          회원정보수정
        </button>
      </div>
    </div>
  );
}
