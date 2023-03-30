import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config/config';

export default function CommunityInventory() {
  const [communityInventory, setCommuntiyInventory] = useState([]);
  const [deleteModal, setDeletModal] = useState(false);

  const Token = localStorage.getItem('accessToken');

  const deleteBtn = () => {
    setDeletModal(prev => !prev);
  };

  useEffect(() => {
    fetch(`${API.MYPAGE}/community-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpc3MiOiJ3YWVtLWRhbmdnZW4iLCJpYXQiOjE2Nzk2NjY0ODcsImV4cCI6MTQ1MTIzMTg0NDc2ODAwfQ.PIHokLiq9ho1e5e3xhi0q-V4TRtRUyNIRgfrBUpUFzM',
      },
    })
      .then(res => res.json())
      .then(data => {
        setCommuntiyInventory(data.data);
      });
  }, []);

  const handledeletedBtn = postId => {
    const updateInventory = communityInventory.filter(
      post => post.id !== postId
    );
    setCommuntiyInventory(updateInventory);
    fetch(`${API.COMMUNITY}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: Token,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.message === 'Post Deleted Successfully') {
          setCommuntiyInventory(updateInventory);
        }
        alert('게시글이 삭제되었습니다!');
      });
    setDeletModal(prev => !prev);
  };

  return (
    <div className="flex justify-center max-md:min-h-[28rem]">
      {communityInventory.length === 0 ? (
        <div className="flex justify-center items-center pt-10">
          <img
            className="w-7"
            src="/images/Mypage/noposting.png"
            alt="no search product"
          />
          <div>등록한 게시글이 없습니다.</div>
        </div>
      ) : (
        <ul>
          {communityInventory.map(list => {
            return (
              <div
                key={list.id}
                className="flex border-t border-solid border-slate-200 max-md:w-[40rem]"
              >
                <Link
                  to={`${process.env.PUBLIC_URL}/neighborinfo/${list.postId}`}
                >
                  <li className="flex justify-between">
                    <div className="p-5">
                      <h1 className="font-bold pb-3 pl-2">{list.title}</h1>
                      <div className="flex items-center">
                        <p className="text-ellipsis overflow-hidden break-words line-clamp-2 w-[44rem] h-12 pl-2 mr-5 max-md:w-[36rem]">
                          {list.description}
                        </p>
                        <img
                          className="w-20 h-20 rounded-lg object-cover max-md:hidden mr-5"
                          src={list.image_url}
                          alt="inventory title img"
                        />
                      </div>
                    </div>
                  </li>
                </Link>
                <button type="button" onClick={deleteBtn}>
                  ×
                </button>
                {deleteModal && (
                  <div className="fixed top-0 left-0 right-0 bottom-0 z-1 bg-gray-100/75">
                    <div className="bg-white w-64 h-32 rounded-lg flex flex-col justify-center items-center top-1/2 left-1/2 absolute -translate-y-1/2 -translate-x-1/2">
                      <p className="pb-5">게시글을 삭제 하시겠습니까?</p>
                      <div>
                        <button
                          type="button"
                          className="bg-slate-200 w-16 h-8 rounded mr-5 hover:bg-slate-300"
                          onClick={deleteBtn}
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          className="bg-green-500 w-16 h-8 rounded hover:bg-green-600"
                          onClick={() => handledeletedBtn(list.postId)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}
