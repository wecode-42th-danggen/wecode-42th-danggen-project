import React from 'react';

export default function UploadForm({
  handleImage,
  handleDescription,
  handleTitle,
  handleprice,
  handleCategoryId,
  handleCheckBox,
  ischecked,
  handlePriceSuggestion,
  uploadInfo,
  handleLocation,
}) {
  const { image, price } = uploadInfo;
  return (
    <form className="flex justify-center " id="upload">
      <div className="flex pt-24 items-center">
        <div>
          <div className="flex pb-16">
            <h1 className="pr-4">물건 팔기</h1>
            <select
              className="border border-gray-300 rounded-md text-sm h-7 outline-none"
              onChange={e => {
                handleCategoryId(e);
              }}
            >
              <option value="none" hidden>
                카테고리 선택
              </option>
              {CATEGORY_OPTIONS.map(category => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.category}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center max-md:flex-col">
            {!image ? (
              <>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  id="uploadImg"
                  onChange={handleImage}
                />
                <div className="w-[32rem] h-96 border border-gray-300 bg-gray-50 hover:bg-gray-100 flex justify-center items-center">
                  <label htmlFor="uploadImg">
                    <img src="images/Posting/photo.png" alt="uploaeImg" />
                    <p>사진 올리기</p>
                  </label>
                </div>
              </>
            ) : (
              <div>
                <input
                  className="pb-2"
                  type="file"
                  accept="image/*"
                  id="uploadImg"
                  onChange={handleImage}
                />
                <img
                  className="object-cover w-[32rem] h-96 border border-gray-300 rounded"
                  src={`${URL.createObjectURL(image)}`}
                  alt="uploadImg"
                  name="image"
                />
              </div>
            )}
            <div className="flex flex-col pl-24 max-md:pl-0 py-20">
              <input
                className="w-96 h-8 border border-gray-300 outline-none rounded mb-4 p-2 text-sm"
                type="text"
                placeholder="제목"
                onChange={handleTitle}
              />
              <input
                className="w-96 h-8 border border-gray-300 outline-none rounded mb-2 p-2 text-sm"
                type="text"
                placeholder="거래 희망 장소"
                onChange={handleLocation}
              />
              <input
                className="w-96 h-8 border border-gray-300 outline-none rounded p-2 text-sm"
                type="text"
                placeholder="￦ 가격(선택사항)"
                onChange={e => handleprice(e)}
                disabled={ischecked}
                value={ischecked ? '' : price ? price : ''}
              />
              <div className="pt-1">
                <label className="text-sm pr-2" htmlFor="priceFree">
                  <input
                    className="mr-2"
                    name="priceFree"
                    type="checkbox"
                    onChange={handleCheckBox}
                  />
                  나눔
                </label>
                <label className="text-sm" htmlFor="priceSuggestion">
                  <input
                    className="mr-2"
                    name="priceSuggestion"
                    type="checkbox"
                    onChange={e => handlePriceSuggestion(e)}
                  />
                  가격 제안받기
                </label>
              </div>
              <textarea
                onChange={handleDescription}
                placeholder="구매시기, 사이즈, 사용감(색바램, 얼룩, 뜯어짐)등 신뢰할 수 있는 거래를 위해 자세한 정보를 제공해주세요."
                className="w-96 h-52 border border-gray-300 outline-none rounded text-sm p-2 overflow-hidden resize-none mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const CATEGORY_OPTIONS = [
  { id: 1, category: '디지털기기' },
  { id: 2, category: '생활가전' },
  { id: 3, category: '가구/인테리어' },
  { id: 4, category: '생활/주방' },
  { id: 5, category: '유아동' },
  { id: 6, category: '유아도서' },
  { id: 7, category: '여성의류' },
  { id: 8, category: '여성잡화' },
  { id: 9, category: '남성패션.잡화' },
  { id: 10, category: '뷰티/미용' },
  { id: 11, category: '스포츠/레저' },
  { id: 12, category: '취미/게임/음반' },
  { id: 13, category: '중고차' },
  { id: 14, category: '도서' },
  { id: 15, category: '티켓/교환권' },
  { id: 16, category: '기공식품' },
  { id: 17, category: '반려동물용품' },
  { id: 18, category: '식물' },
  { id: 19, category: '기타 중고물품' },
  { id: 20, category: '삽니다' },
  { id: 21, category: '부동산' },
];
