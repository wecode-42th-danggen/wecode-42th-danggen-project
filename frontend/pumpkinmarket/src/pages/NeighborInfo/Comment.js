import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../config/config';

export default function Comment() {
  const [getComment, setGetComment] = useState([]);
  const [comment, setComment] = useState('');

  const params = useParams();

  const Token = localStorage.getItem('accessToken');

  const commnetInput = e => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const addComment = () => {
    fetch(`${API.COMMENTS}/${params.cmpostId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: Token,
      },
      body: JSON.stringify({
        content: comment,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (comment === '') {
          return alert('댓글을 입력 해 주세요');
        } else if (Token === 'undefined') {
          alert('로그인이 필요합니다.');
        }
        const result = [
          {
            content: comment,
          },
          ...getComment,
        ];
        setGetComment(result);
        setComment('');
      });
  };

  const handledeletedBtn = commentId => {
    const updateComment = getComment.filter(
      comment => comment.commentId !== commentId
    );
    setGetComment(updateComment);
    fetch(`${API.COMMENTS}/${commentId}`, {
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
          setGetComment(updateComment);
          alert('게시글이 삭제되었습니다!');
        }
      });
  };

  useEffect(() => {
    fetch(`${API.COMMENTS}/${params.cmpostId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: Token,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setGetComment(data.data);
      });
  }, [params.cmpostId]);

  return (
    <div>
      <p className="font-bold pt-3">댓글 {getComment.length}</p>
      <form>
        <ol className="flex pt-3 flex-col">
          {getComment.map(list => {
            return (
              <li key={list.commentId}>
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 rounded-full mr-2"
                    src={list.userProfileImage}
                    alt="commentUserProfileImageUrl"
                  />
                  <p className="text-sm font-semibold">{list.userNickname}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="pl-7 w-[32rem]">{list.commentContent}</p>
                  <button
                    type="button"
                    onClick={() => handledeletedBtn(list.commentId)}
                  >
                    <img
                      className="w-3 h-3"
                      src="/images/Mypage/wastebasket.png"
                      alt="comment delete button"
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </form>
      <div className="pt-3">
        <input
          className="bg-slate-100 rounded-xl w-11/12 h-8 p-2 text-sm outline-none"
          placeholder="댓글을 입력해주세요."
          onChange={commnetInput}
          type="text"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addComment();
            }
          }}
        />
        <button
          className="pl-4 text-sm font-semibold"
          type="submit"
          onClick={addComment}
        >
          게시
        </button>
      </div>
    </div>
  );
}
