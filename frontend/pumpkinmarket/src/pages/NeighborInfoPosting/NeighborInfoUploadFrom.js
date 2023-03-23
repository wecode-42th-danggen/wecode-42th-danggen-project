import React from 'react';

export default function NeighborInfoUploadFrom({
  handleImg,
  handleTitle,
  handleDes,
  handleCategoryId,
  upload,
}) {
  const { img } = upload;

  return (
    <form className="pt-36 flex justify-center max-md:flex-col" id="upload">
      <div className="flex mr-20 max-md:pb-5">
        <h1 className="pr-4">글쓰기</h1>
        <select
          onChange={e => {
            handleCategoryId(e);
          }}
          className="border border-gray-300 rounded-md text-sm h-7 outline-none w-28"
        >
          <option value="none" hidden>
            카테고리 선택
          </option>
          {NEIGHBORINFO_OPTIONS.map(list => {
            return (
              <option value={list.id} key={list.id}>
                {list.category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex max-md:flex-col">
        <div className="flex flex-col">
          <input
            className="w-[32rem] h-8 border-b border-gray-300 outline-none mb-4 p-2 text-sm"
            type="text"
            placeholder="제목"
            onChange={handleTitle}
          />
          <textarea
            onChange={handleDes}
            placeholder="문情 생활에 궁금하신 것이 있으신가요? 가까이 사는 근처 이웃들에게 궁금한 점을 무엇이든지 물어보세요!"
            className="w-[32rem] h-96 border border-gray-300 outline-none text-sm p-2 overflow-hidden resize-none mt-1"
          />
        </div>
        <div>
          {!img ? (
            <>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                id="uploadImg"
                onChange={handleImg}
              />
              <div className="w-28 h-28 ml-5 mt-14 border border-gray-300 bg-gray-50 hover:bg-gray-100 flex justify-center items-center max-md:ml-0">
                <label
                  className="flex flex-col items-center"
                  htmlFor="uploadImg"
                >
                  <img
                    className="w-10"
                    src="images/Posting/photo.png"
                    alt="uploaeImg"
                  />
                  <p className="text-sm">사진 올리기</p>
                </label>
              </div>
            </>
          ) : (
            <div className="ml-5 mt-14">
              <input
                className="pb-2"
                type="file"
                accept="image/*"
                id="uploadImg"
                onChange={handleImg}
              />
              <img
                className="object-cover w-28 h-28 border border-gray-300 rounded"
                src={`${URL.createObjectURL(img)}`}
                alt="uploadImg"
                name="image"
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
const NEIGHBORINFO_OPTIONS = [
  { id: 1, category: '동네정보' },
  { id: 2, category: '맛집/카페' },
  { id: 3, category: '동네 사건/사고' },
];
