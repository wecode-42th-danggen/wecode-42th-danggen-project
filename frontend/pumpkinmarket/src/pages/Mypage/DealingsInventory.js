import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config/config';

export default function DealingsInventory() {
  const [dealingsInventory, setDealingsInventory] = useState([]);
  const [deleteModal, setDeletModal] = useState(false);

  const Token = localStorage.getItem('accessToken');
  // const handleDeletBtn = postId => {
  //   const updatedInventory = dealingsInventory.filter(
  //     post => post.postId !== postId
  //   );
  //   setDealingsInventory(updatedInventory);
  // };

  const handleDeletBtn = postId => {
    setDealingsInventory(postId);
    fetch(`${API.POSTS}/${postId}`, {
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
          setDealingsInventory(
            dealingsInventory.filter(post => post.postId !== postId)
          );
        }
        alert('게시글이 삭제되었습니다!');
      });
  };

  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`${API.MYPAGE}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setDealingsInventory(data.data);
      });
  }, []);

  // TOFIX: mockdata 연결 시 동작할 코드
  // useEffect(() => {
  //   fetch(`./data/dealingsdata.json`, {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setDealingsInventory(data.data);
  //     });
  // }, []);

  return (
    <div className="flex justify-center">
      <ul>
        {dealingsInventory?.map(list => {
          return (
            <div className="flex" key={list.postId}>
              <Link to={`product/${list.postId}`}>
                <li className="flex justify-between">
                  <div className="p-5">
                    <hr className="pb-7" />
                    <h1 className="font-bold pb-2 pl-2 text-lg">
                      {list.postTitle}
                    </h1>
                    <div className="flex items-center">
                      <p className="text-ellipsis overflow-hidden break-words line-clamp-2 w-[44rem] h-12 pl-2">
                        {list.postDescription}
                      </p>
                      <img
                        className="w-20 h-20 rounded-lg object-cover mx-7"
                        src={list.postImageUrl}
                        alt="inventory title img"
                      />
                    </div>
                    <div className="flex">
                      <img
                        className="w-7 h-7 rounded-full mr-3"
                        src={list.profileImageUrl}
                        alt="user profile img"
                      />
                      <p>{list.userNickname}</p>
                    </div>
                  </div>
                </li>
              </Link>
              <button type="button" onClick={() => handleDeletBtn(list.postId)}>
                <img
                  className="w-4 h-4"
                  src="/images/Mypage/wastebasket.png"
                  alt="delete inventory"
                />
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
