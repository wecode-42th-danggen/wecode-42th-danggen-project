import React, { useState, useEffect } from 'react';
import CommunityTable from './CommunityTable';
import Chat from '../Chat/Chat';
import { API } from '../../config/config';

export default function CommunityPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API.ADMIN}/cmpost`, {
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
