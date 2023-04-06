import React, { useState, useEffect } from 'react';
import DealingsTable from './DealingsTable';
import { API } from '../../config/config';

export default function MemberPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API.ADMIN}/posts`, {
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
