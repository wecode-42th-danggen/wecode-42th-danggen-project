import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommunityInventory from './CommunityInventory';
import ChattingInventory from './ChattingInventory';
import LikeInventory from './LikeInventory';
import DealingInventory from './DealingsInventory';
import CommentInventory from './CommentInventory';

export default function Mypage() {
  const [navigate, setNavigate] = useState('문정마켓 게시글');

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

  return (
    <div className="pt-32 p-64">
      <h1 className="font-bold text-2xl">마이페이지</h1>
      <div className="flex flex-col items-center">
        <img
          className="w-32 pb-2"
          src="/images/Nav/profile.png"
          alt="usr profile img"
        />
        <h2 className="font-medium text-gray-600">닉네임</h2>
      </div>
      <nav>
        <ul className="flex justify-between p-8">
          {MYPAGE_CATEROTY.map(category => {
            return (
              <Link key={category.id} onClick={() => onClick(category.title)}>
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
