import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const [clickedLikeBtn, setClickedLikeBtn] = useState(false);
  const [productData, setProductData] = useState([]);
  const params = useParams();

  const toggleLike = e => {
    setClickedLikeBtn(!clickedLikeBtn);
  };

  const heart = '/images/Product/heart.png';
  const colorHeart = '/images/Product/colorheart.png';

  const Token = localStorage.getItem('accessToken');

  // TOFIX: API 연결 시 동작할 코드
  // useEffect(() => {
  //   fetch(`./data/data.json`, {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setProductData(data.data);
  //     });
  // }, []);

  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`http://192.168.0.194:4000/posts?postId=${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: Token,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProductData(data.data);
      });
  }, [params.id]);

  return (
    <section className="py-32 flex flex-col m-auto w-[32rem]">
      <img
        className="object-cover w-[32rem] h-96 rounded-lg"
        src={productData[0]?.postInfo[0].imageUrl}
        alt="productimg"
      />
      <div className="flex justify-between border-b border-slate-100 py-4">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src="/images/Product/profile2.jpeg"
            alt="userProfile"
          />
          <p className="pl-2 text-sm ffont-normal">
            {productData[0]?.postInfo[0].nickName}
          </p>
        </div>
        <button
          className="flex flex-col items-center text-xs text-gray-500"
          onClick={toggleLike}
        >
          <img
            className="w-4"
            src={clickedLikeBtn ? colorHeart : heart}
            alt="likeBtn"
          />
          좋아요
        </button>
      </div>
      <h1 className="font-medium pt-4">{productData[0]?.postInfo[0].title}</h1>
      <p className="text-xs text-gray-500 pt-2">
        {productData[0]?.postInfo[0].category} &#183; 6일전
      </p>
      <p className="font-medium pt-4">{productData[0]?.postInfo[0].price}</p>
      <p className="pt-4">{productData[0]?.postInfo[0].description}</p>
      <p className="text-xs text-gray-500 pt-4">
        좋아요 {productData[0]?.postInfo[0].likes}&#183; 조회 3992
      </p>
    </section>
  );
}
