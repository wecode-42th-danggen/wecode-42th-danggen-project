import React, { useEffect, useState } from 'react';

export default function LikeInventory() {
  const [likeInventory, setLikeInventory] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.194:4000/mypage/likes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpc3MiOiJ3YWVtLWRhbmdnZW4iLCJpYXQiOjE2Nzk2NjY0ODcsImV4cCI6MTQ1MTIzMTg0NDc2ODAwfQ.PIHokLiq9ho1e5e3xhi0q-V4TRtRUyNIRgfrBUpUFzM',
      },
    })
      .then(res => res.json())
      .then(data => {
        setLikeInventory(data.data);
      });
  }, []);

  return (
    <div>
      <img
        className="w-52 h-52 rounded-lg object-cover"
        src="/images/Product/chair.jpg"
        alt="liked inventory"
      />
      <p className="font-semibold pt-2">튼튼한 의자 팔아요</p>
    </div>
  );
}
