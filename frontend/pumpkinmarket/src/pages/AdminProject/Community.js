import React from 'react';
import AdminProject from './AdminProject';
import CommunityPage from './CommunityPage';

export default function Community() {
  return (
    <div className="flex pt-20 pr-5">
      <AdminProject />
      <CommunityPage />
    </div>
  );
}
