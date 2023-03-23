import React from 'react';
import AdminProject from './AdminProject';
import MemberPage from './MemberPage';
import './pagingCss.css';

export default function Member() {
  return (
    <>
      <div className="flex pt-20 pr-5">
        <AdminProject />
        <MemberPage />
      </div>
    </>
  );
}
