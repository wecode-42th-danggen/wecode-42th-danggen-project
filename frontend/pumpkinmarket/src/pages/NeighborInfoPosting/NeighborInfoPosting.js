import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeighborInfoUploadFrom from './NeighborInfoUploadFrom';
import { API } from '../../config/config';

export default function NeighborInfoPosting() {
  const [upload, setUpload] = useState({
    img: '',
    title: '',
    description: '',
    categoryId: 0,
  });
  console.log(upload);
  const navigate = useNavigate();

  const handleImg = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setUpload(prev => ({ ...prev, img: file }));
  };

  const handleTitle = e => {
    setUpload(prev => ({ ...prev, title: e.target.value }));
  };

  const handleDes = e => {
    setUpload(prev => ({ ...prev, description: e.target.value }));
  };

  const handleCategoryId = e => {
    setUpload(prev => ({ ...prev, categoryId: parseInt(e.target.value) }));
  };

  const uploadForm = new FormData();
  uploadForm.append('img', upload.img);
  uploadForm.append('title', upload.title);
  uploadForm.append('description', upload.description);
  uploadForm.append('categoryId', JSON.stringify(upload.categoryId));

  const Token = localStorage.getItem('accessToken');

  const onSubmit = e => {
    e.preventDefault();

    fetch(`${API.COMMUNITY}`, {
      method: 'POST',
      headers: {
        enctype: 'multipart/form-data',
        authorization: Token,
      },
      body: uploadForm,
    })
      .then(response => response.json())
      .then(data => {
        // if (data.message === 'CREATE_COMMUNITY_POST') {
        navigate('/neighborinfo-list');
        // } else {
        //   alert('실패');
        // }
      });
  };

  return (
    <div className="h-full pb-24">
      <nav className="pt-20">
        <div className="flex justify-between h-14 items-center border-b border-gray-100 bg-white fixed w-full">
          <h1 className="pl-40 font-bold max-md:pl-10">동네생활 글쓰기</h1>
          <button
            className="h-8 pr-20 text-lg rounded-md p-1.5 text-orange-500 ml-3.5 text-sm hover:text-orange-600"
            type="button"
            onClick={onSubmit}
          >
            게시하기
          </button>
        </div>
      </nav>
      <NeighborInfoUploadFrom
        handleImg={handleImg}
        handleTitle={handleTitle}
        handleDes={handleDes}
        handleCategoryId={handleCategoryId}
        upload={upload}
      />
    </div>
  );
}
