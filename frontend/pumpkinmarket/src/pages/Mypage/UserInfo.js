import React, { useEffect, useState } from 'react';
import { API } from '../../config/config';

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState();
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

  const onSubmit = e => {
    e.preventDefault();

    fetch(`${API.POSTS}`, {
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
      <span className="font-bold text-2xl">회원정보수정</span>
      <form className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center ml-24">
            {!image ? (
              <>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  id="uploadImg"
                  onChange={handleUpdateUserImg}
                />
                <div className="w-60 h-60 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-100 flex justify-center items-center">
                  <label
                    className="flex flex-col items-center"
                    htmlFor="uploadImg"
                  >
                    <img
                      className="w-10 h-8 mb-2"
                      src="/images/Posting/photo.png"
                      alt="uploaeImg"
                    />
                    <p className="text-sm">이미지 변경</p>
                  </label>
                </div>
                <span className="pt-5">프로필 이미지</span>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="uploadImg"
                  onChange={handleUpdateUserImg}
                />
                <img
                  className="object-cover w-60 h-60 rounded-full border border-gray-300 rounded"
                  src={`${URL.createObjectURL(image)}`}
                  alt="uploadImg"
                  name="image"
                />
              </>
            )}
          </div>
          <div className="flex items-center">
            <span className="w-32">이메일</span>
            <div>
              <input
                type="email"
                className="w-96 h-8 border border-gray-300 outline-none rounded p-2 text-sm"
              />
              <p className="text-sm font-semibold text-slate-400 pt-2">
                * 이메일을 변경하시려면 문情 운영진에게 메일을 보내주세요.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="w-32">닉네임</span>
            <input
              type="text"
              className="w-96 h-8 border border-gray-300 outline-none rounded p-2 text-sm"
              onChange={handleUpdateNickname}
              defaultValue={userInfo && userInfo.nickname}
            />
          </div>
          <div className="flex items-center">
            <span className="w-32">휴대폰번호</span>
            <input
              type="tel"
              className="w-96 h-8 border border-gray-300 outline-none rounded p-2 text-sm"
              onChange={handleUpdatePhoneNum}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-green-500 text-white rounded-md h-10 w-32 mt-10 ml-24 hover:bg-green-600"
        >
          회원정보수정
        </button>
      </form>
    </div>
  );
}
