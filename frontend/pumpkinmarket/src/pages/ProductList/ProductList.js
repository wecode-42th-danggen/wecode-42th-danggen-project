import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [ProductListData, setProductListData] = useState([]);

  const postInfoData = ProductListData.map(data => data.postInfo);

  // TOFIX: Mockdata 연결 시 동작할 코드
  // useEffect(() => {
  //   fetch('./data/data.json', {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setProductListData(data.data);
  //     });
  // }, []);

  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`http://192.168.0.194:4000/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setProductListData(data.data);
      });
  }, []);

  return (
    <section className="h-sreen py-32 ">
      <div className="pt-14 flex flex-col items-center">
        <h1 className="text-3xl font-semibold pb-16">중고거래 매물</h1>
        <div className="grid grid-cols-4 gap-12 justify-items-center">
          {postInfoData.map(data => {
            return (
              <Link className="w-52" key={data.id} to="/product">
                <img
                  className="object-cover w-52 h-52 rounded-xl mb-2"
                  src={data[0].imageUrl}
                  alt="product"
                />
                <div>
                  <h2 className="pb-1">{data[0].title}</h2>
                  <p className="text-sm font-bold pb-1">
                    {data[0].price.toLocaleString()}원
                  </p>
                  <p className="text-xs text-zinc-500 pb-1">
                    좋아요 {data[0].likes}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
