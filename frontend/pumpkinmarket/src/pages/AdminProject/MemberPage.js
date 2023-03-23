import React, { useState, useEffect } from 'react';
import MemberTable from './MemberTable';

export default function MemberPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.194:4000/admin/users`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data.data);
      });
  }, []);

  return (
    <div className="pt-32 h-screen flex align py-12 max-w-5xl">
      <MemberTable data={data} />
    </div>
  );
}
