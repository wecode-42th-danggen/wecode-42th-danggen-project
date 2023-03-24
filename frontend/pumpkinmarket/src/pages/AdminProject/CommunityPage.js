import React, { useState, useEffect } from 'react';
import CommunityTable from './CommunityTable';

export default function CommunityPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.219.104:3000/admin/cmpost`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data.data);
      });
  }, []);

  return (
    <div className="h-screen flex align py-12 max-w-5xl">
      <CommunityTable data={data} />
    </div>
  );
}
