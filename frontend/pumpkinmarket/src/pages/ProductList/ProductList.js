import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductList() {
  const [ProductListData, setProductListData] = useState([]);

  const navigate = useNavigate();

  const goToPosting = () => {
    navigate('/posting');
  };

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
      <div className="pt-14 flex flex-col items-center re">
        <h1 className="text-3xl font-semibold pb-20">중고거래 매물</h1>
        <button
          className="text-lg rounded-full p-1.5 bg-green-500 text-white text-sm w-20 fixed bottom-28 right-40 max-md:right-12"
          onClick={goToPosting}
        >
          + 글쓰기
        </button>
        <div className="grid grid-cols-4 gap-12 max-md:grid-cols-2">
          {ProductListData.map(data => {
            return (
              <Link className="w-52" key={data.id} to={`/product/${data.id}`}>
                {data.postInfo.map(list => {
                  return (
                    <>
                      <img
                        className="object-cover w-52 h-52 rounded-xl mb-2"
                        src={list.imageUrl}
                        alt="product"
                      />
                      <div>
                        <h2 className="pb-1">{list.title}</h2>
                        <p className="text-sm font-bold pb-1">{list.price}원</p>
                        <p className="text-xs text-zinc-500 pb-1">
                          좋아요 {list.likes}
                        </p>
                      </div>
                    </>
                  );
                })}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
