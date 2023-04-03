import React from 'react';

export default function UserInfoUpload({
  userInfo,
  handleUpdateNickname,
  handleUpdatePhoneNum,
  handleUpdateUserImg,
  image,
}) {
  console.log('userInfo::', userInfo);
  return (
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
              defaultValue={userInfo.email}
              disabled
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
            defaultValue={userInfo.nickname}
          />
        </div>
        <div className="flex items-center">
          <span className="w-32">휴대폰번호</span>
          <input
            type="tel"
            className="w-96 h-8 border border-gray-300 outline-none rounded p-2 text-sm"
            onChange={handleUpdatePhoneNum}
            defaultValue={userInfo.phoneNumber}
          />
        </div>
      </div>
    </form>
  );
}
