import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadForm from './UploadForm';

export default function Posting() {
  const [ischecked, setIsChecked] = useState(false);
  const [uploadInfo, setUploadInfo] = useState({
    image: '',
    title: '',
    description: '',
    // location: '',
    categoryId: 0,
    price: 0,
    priceSuggestion: 0,
  });
  console.log(uploadInfo);

  const navigate = useNavigate();

  const uploadForm = new FormData();
  uploadForm.append('title', uploadInfo.title);
  uploadForm.append('description', uploadInfo.description);
  uploadForm.append('categoryId', JSON.stringify(uploadInfo.categoryId));
  uploadForm.append('image', uploadInfo.image);
  uploadForm.append('price', JSON.stringify(uploadInfo.price));
  uploadForm.append(
    'priceSuggestion',
    JSON.stringify(uploadInfo.priceSuggestion)
  );
  // uploadForm.append('location', uploadInfo.location);

  const handlePriceSuggestion = e => {
    const isChecked = e.target.checked ? 1 : 0;
    setUploadInfo(prev => ({ ...prev, priceSuggestion: isChecked }));
  };

  const handleCheckBox = e => {
    setUploadInfo(prev => ({
      ...prev,
      price: e.target.value ? 0 : uploadInfo.price,
    }));
    setIsChecked(prev => !prev);
  };

  const handleprice = e => {
    const price = e.target.value ? parseInt(e.target.value) : 0;
    setUploadInfo(prev => ({ ...prev, price }));
  };

  const handleImage = e => {
    e.preventDefault();

    const file = e.target.files[0];

    setUploadInfo(prev => ({ ...prev, image: file }));
  };

  const handleTitle = e => {
    setUploadInfo(prev => ({ ...prev, title: e.target.value }));
  };

  // const handleLocation = e => {
  //   setUploadInfo(prev => ({ ...prev, location: e.target.value }));
  // };

  const handleDescription = e => {
    setUploadInfo(prev => ({ ...prev, description: e.target.value }));
  };

  const handleCategoryId = e => {
    setUploadInfo(prev => ({ ...prev, categoryId: parseInt(e.target.value) }));
  };

  const Token = localStorage.getItem('accessToken');

  const onSubmit = e => {
    e.preventDefault();

    fetch(`http://192.168.0.192:4000/posts`, {
      method: 'POST',
      headers: {
        enctype: 'multipart/form-data',
        authorization: Token,
      },
      body: uploadForm,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Post Created Successfully') {
          navigate('/');
        } else {
          alert('실패');
        }
      });
  };

  return (
    <div className="h-screen max-md:h-full">
      <nav className="pt-20">
        <div className="flex justify-between h-14 items-center border-b border-gray-100 bg-white fixed w-full">
          <h1 className="pl-40 font-bold">내 물건 팔기</h1>
          <button
            type="button"
            onClick={onSubmit}
            className="h-8 pr-20 text-lg rounded-md p-1.5 text-lime-500 ml-3.5 text-sm hover:text-lime-600"
          >
            게시하기
          </button>
        </div>
      </nav>
      <UploadForm
        handleImage={handleImage}
        handleTitle={handleTitle}
        handleDescription={handleDescription}
        handleprice={handleprice}
        handleCategoryId={handleCategoryId}
        handleCheckBox={handleCheckBox}
        ischecked={ischecked}
        handlePriceSuggestion={handlePriceSuggestion}
        uploadInfo={uploadInfo}
        // handleLocation={handleLocation}
      />
    </div>
  );
}
