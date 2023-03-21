import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeighborInfoUploadFrom from './NeighborInfoUploadFrom';

export default function NeighborInfoPosting() {
  const [upload, setUpload] = useState({
    img: '',
    title: '',
    description: '',
    categoryId: '',
  });

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
    setUpload(prev => ({ ...prev, categoryId: e.target.value }));
  };

  const uploadForm = new FormData();
  uploadForm.append('img', upload.img);
  uploadForm.append('title', upload.title);
  uploadForm.append('description', upload.description);
  uploadForm.append('categoryId', JSON.stringify(upload.categoryId));

  const onSubmit = e => {
    e.preventDefault();

    fetch(`http://192.168.0.195:3000/communityposts`, {
      method: 'POST',
      headers: {
        enctype: 'multipart/form-data',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMyLCJpc3MiOiJ3YWVtLWRhbmdnZW4iLCJpYXQiOjE2Nzg5MDExMjksImV4cCI6MTQ1MDU3MDU3NTQ1NjAwfQ._4qf8g9kjpz2uFyyIEnpc_g4DoXlTIQ50E1JyB2Sed0',
      },
      body: uploadForm,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'CREATE_COMMUNITY_POST') {
          navigate('/neighborinfo-list');
        } else {
          alert('실패');
        }
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
