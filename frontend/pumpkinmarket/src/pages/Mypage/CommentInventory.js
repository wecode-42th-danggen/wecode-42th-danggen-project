import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config/config';

export default function CommentInventory() {
  const [commentInventory, setCommentInventory] = useState([]);
  const [deleteModal, setDeletModal] = useState(false);

  const Token = localStorage.getItem('accessToken');

  const deleteBtn = () => {
    setDeletModal(prev => !prev);
  };

  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`${API.MYPAGE}/community-comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCommentInventory(data.data);
      });
  }, []);

  const handleDeleteComment = id => {
    const updateComment = commentInventory.filter(comment => comment.id !== id);
    setCommentInventory(updateComment);
    fetch(`${API.COMMENTS}/${id}`, {
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
        if (data.message === 'DELETE_COMMENT') {
          setCommentInventory(updateComment);
          alert('댓글이 삭제되었습니다!');
        }
      });
    setDeletModal(prev => !prev);
  };

  return (
    <>
      <div className="flex justify-center min-h-[36rem]">
        {commentInventory.length === 0 ? (
          <div className="flex justify-center items-center pt-10 max-md:h-screen">
            <img
              className="w-7"
              src="/images/Mypage/noposting.png"
              alt="no search product"
            />
            <div>등록한 댓글이 없습니다.</div>
          </div>
        ) : (
          <ul>
            {commentInventory.map(list => {
              return (
                <div className="flex" key={list.postId}>
                  <Link
                    to={`${process.env.PUBLIC_URL}/neighborinfo/${list.postId}`}
                  >
                    <li className="flex justify-between">
                      <div className="p-5">
                        <hr className="pb-7" />
                        <div className="flex items-center">
                          <p className="text-ellipsis overflow-hidden break-words line-clamp-2 w-[44rem] h-12 pl-2">
                            👤 {list.content}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Link>
                  <button type="button" onClick={deleteBtn}>
                    ×
                  </button>
                </div>
              );
            })}
          </ul>
        )}
      </div>
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
                onClick={() => handleDeleteComment(commentInventory[0].id)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
