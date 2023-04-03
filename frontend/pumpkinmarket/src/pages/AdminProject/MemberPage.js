import React, { useState, useEffect } from 'react';
import MemberTable from './MemberTable';

export default function MemberPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://52.79.164.28:3000/admin/users`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data.data);
      });
  }, []);

  return (
    <div className="h-screen flex align py-12 max-w-5xl">
      <MemberTable data={data} />
    </div>
  );
}
