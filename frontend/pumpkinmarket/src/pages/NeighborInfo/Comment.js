import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../config/config';

export default function Comment() {
  const [acquireComment, setAcquireComment] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [comment, setComment] = useState('');

  const params = useParams();

  const Token = localStorage.getItem('accessToken');

  const commnetInput = e => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const addComment = () => {
    if (comment === '') {
      return alert('댓글을 입력 해 주세요');
    }
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
        const result = [
          {
            commentContent: comment,
            userProfileImage: userInfo.profileImageUrl,
            userNickname: userInfo.nickname,
          },
          ...acquireComment,
        ];
        setAcquireComment(result);
        window.location.reload();
        setComment('');
        alert('댓글이 작성되었습니다');
      });
  };

  const handledeletedBtn = commentId => {
    const updateComment = acquireComment.filter(
      comment => comment.commentId !== commentId
    );
    setAcquireComment(updateComment);
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
          setAcquireComment(updateComment);
          alert('댓글이 삭제되었습니다!');
        }
      });
  };

  useEffect(() => {
    fetch(`http://192.168.0.194:4000/users/image`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  }, []);

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
        setAcquireComment(data.data);
      });
  }, [params.cmpostId]);
  return (
    <div>
      <p className="font-bold pt-3">댓글 {acquireComment.length}</p>
      <form>
        <ol className="flex pt-3 flex-col">
          {acquireComment.map(list => {
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
          value={comment}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addComment();
            }
          }}
        />
        <button
          className="pl-4 text-sm font-semibold"
          onClick={e => {
            e.preventDefault();
            addComment();
          }}
        >
          게시
        </button>
      </div>
    </div>
  );
}
