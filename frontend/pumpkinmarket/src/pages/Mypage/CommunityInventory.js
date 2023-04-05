import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config/config';
import DeleteModal from './DeleteModal';

export default function CommunityInventory() {
  const [communityInventory, setCommuntiyInventory] = useState([]);
  const [deleteModal, setDeletModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const Token = localStorage.getItem('accessToken');

  const deleteBtn = id => {
    setPostId(id);
    setDeletModal(prev => !prev);
  };

  useEffect(() => {
    fetch(`${API.MYPAGE}/community-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCommuntiyInventory(data.data);
      });
  }, []);

  const handleDeletBtn = () => {
    const updatedInventory = communityInventory.filter(
      post => post.postId !== postId
    );
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
        if (data.message === 'DELETE_COMMUNITY_POST') {
          setCommuntiyInventory(updatedInventory);
        }
        alert('게시글이 삭제되었습니다!');
      });
    setDeletModal(false);
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
                        {list.image_url === null ? (
                          ''
                        ) : (
                          <img
                            className="w-20 h-20 rounded-lg object-cover max-md:hidden mr-5"
                            src={list.image_url}
                            alt="inventory title img"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                </Link>
                <button type="button" onClick={() => deleteBtn(list.postId)}>
                  ×
                </button>
              </div>
            );
          })}
        </ul>
      )}
      <DeleteModal
        deleteModal={deleteModal}
        postId={postId}
        deleteBtn={deleteBtn}
        handleDeletBtn={() => handleDeletBtn(postId)}
      />
    </div>
  );
}
