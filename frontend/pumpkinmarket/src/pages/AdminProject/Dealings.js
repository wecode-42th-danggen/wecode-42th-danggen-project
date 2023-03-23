import React from 'react';
import AdminProject from './AdminProject';
import DealingsPage from './DealingsPage';

export default function Dealings() {
  return (
    <>
      <div className="flex pt-20 pr-5">
        <AdminProject />
        <DealingsPage />
      </div>
    </>
  );
}
