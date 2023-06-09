import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminProject() {
  return (
    <div className="pt-20 h-screen leading-10 pl-9 w-96 whitespace-nowrap">
      <ul>
        <li>
          <Link to="/member">회원관리</Link>
        </li>
        <li>
          <Link to="/dealings">중고거래 게시글 관리</Link>
        </li>
        <li>
          <Link to="/community">커뮤니티 게시글 관리</Link>
        </li>
      </ul>
    </div>
  );
}
