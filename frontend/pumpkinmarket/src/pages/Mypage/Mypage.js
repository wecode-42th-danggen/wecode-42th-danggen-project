import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../config/config';
import CommunityInventory from './CommunityInventory';
import ChattingInventory from './ChattingInventory';
import LikeInventory from './LikeInventory';
import DealingInventory from './DealingsInventory';
import CommentInventory from './CommentInventory';

export default function Mypage() {
  const [navigate, setNavigate] = useState('문정마켓 게시글');
  const [userInfo, setUserInfo] = useState([]);

  const navigated = useNavigate();

  const goUserInfo = () => {
    navigated('/user-info');
  };

  const Token = localStorage.getItem('accessToken');

  const onClick = category => {
    setNavigate(category);
  };

  const navigatedCategory = () => {
    if (navigate === '문정마켓 게시글') {
      return <DealingInventory />;
    } else if (navigate === '동네정보 게시글') {
      return <CommunityInventory />;
    } else if (navigate === '좋아요') {
      return <LikeInventory />;
    } else if (navigate === '댓글 목록') {
      return <CommentInventory />;
    } else if (navigate === '채팅기록') {
      return <ChattingInventory />;
    }
  };

  useEffect(() => {
    fetch(`${API.USERPROFILEIMG}`, {
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

  return (
    <div className="pt-32 p-72 max-md:p-20">
      <h1 className="font-bold text-2xl">마이페이지</h1>
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 mb-2 rounded-full object-cover"
          src={
            userInfo.profileImageUrl
              ? userInfo.profileImageUrl
              : '/images/Nav/profile.png'
          }
          alt="user profile img"
        />
        <h2 className="font-semibold text-gray-600">{userInfo.nickname}</h2>
        <button
          type="button"
          onClick={goUserInfo}
          className="border border-slate-200 rounded-md p-1 mt-3 hover:bg-slate-200"
        >
          회원정보
        </button>
      </div>
      <nav className="pt-5">
        <ul className="flex justify-between p-8 pb-24">
          {MYPAGE_CATEROTY.map(category => {
            return (
              <Link
                className={
                  navigate === category.title
                    ? 'visited: border-b-2 border-green-500 font-bold'
                    : 'font-semibold'
                }
                key={category.id}
                onClick={() => onClick(category.title)}
              >
                <li>{category.title}</li>
              </Link>
            );
          })}
        </ul>
      </nav>
      {navigatedCategory()}
    </div>
  );
}

const MYPAGE_CATEROTY = [
  {
    id: 1,
    title: '문정마켓 게시글',
  },
  {
    id: 2,
    title: '동네정보 게시글',
  },
  {
    id: 3,
    title: '좋아요',
  },
  {
    id: 4,
    title: '댓글 목록',
  },
  {
    id: 5,
    title: '채팅기록',
  },
];
