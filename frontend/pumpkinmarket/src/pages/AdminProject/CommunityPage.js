import React, { useState, useEffect } from 'react';
import CommunityTable from './CommunityTable';
import Chat from '../Chat/Chat';

export default function CommunityPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://52.79.164.28:3000/admin/cmpost`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data.data);
      });
  }, []);

  return (
    <div className="h-screen flex align py-12 max-w-5xl">
      <CommunityTable data={data} />
      <Chat />
    </div>
  );
}
