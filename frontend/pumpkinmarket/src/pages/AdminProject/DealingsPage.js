import React, { useState, useEffect } from 'react';
import DealingsTable from './DealingsTable';

export default function MemberPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.194:4000/admin/posts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data.data);
      });
  }, []);

  return (
    <div className="h-screen flex align py-12 max-w-5xl">
      <DealingsTable data={data} />
    </div>
  );
}
