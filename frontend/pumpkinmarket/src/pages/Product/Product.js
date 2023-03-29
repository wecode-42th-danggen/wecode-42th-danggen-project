import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/ko';

export default function Product() {
  const [isClickedLikeBtn, setClickedLikeBtn] = useState(null);
  const [productData, setProductData] = useState([]);
  const [addLike, setAddLike] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  const goToPosting = () => {
    navigate(`/chat/${params.id}`);
  };

  const startTime = new Date(productData[0]?.postInfo[0].createdTime);

  const handleAddLike = e => {
    const updateBtn = addLike === true ? false : true;
    setAddLike(updateBtn);
    setClickedLikeBtn(!isClickedLikeBtn);
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
        console.log(productData);
      });
  }, [params.id]);

  // TOFIX: addLike API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`http://192.168.0.194:4000/posts/likes/${params.id}`, {
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
        setAddLike(data.data);
      });
  }, [params.id]);

  // TOFIX: addLike API 연결 시 동작할 코드
  useEffect(() => {
    if (isClickedLikeBtn && addLike)
      fetch(`http://192.168.0.194:4000/posts/likes/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: Token,
        },
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          data.message === 'Like Created' &&
            alert('관심상품으로 등록되었습니다!');
          // setAddLike(data.data);
        });
  }, [params.id, isClickedLikeBtn, addLike]);

  useEffect(() => {
    if (isClickedLikeBtn !== null && !addLike)
      fetch(`http://192.168.0.194:4000/posts/likes/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: Token,
        },
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          data.message === 'Like Deleted' &&
            alert('관심상품 목록에서 삭제되었습니다!');
        });
  }, [params.id, addLike]);

  return (
    <section className="py-32 flex flex-col m-auto w-[32rem]">
      <button
        className="text-lg rounded-full p-1.5 bg-green-500 text-white text-sm w-20 fixed bottom-28 right-40 max-md:right-12"
        onClick={goToPosting}
      >
        + 채팅하기
      </button>
      <img
        className="object-cover w-[32rem] h-96 rounded-lg"
        src={productData[0]?.postInfo[0].imageUrl}
        alt="productimg"
      />
      <div className="flex justify-between border-b border-slate-100 py-4">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src={
              productData[0]?.postInfo[0].profileImageUrl
                ? productData[0]?.postInfo[0].profileImageUrl
                : '/images/Nav/profile.png'
            }
            alt="userProfile"
          />
          <p className="pl-2 text-sm ffont-normal">
            {productData[0]?.postInfo[0].nickname}
          </p>
        </div>
        <button
          className="flex flex-col items-center text-xs text-gray-500"
          onClick={handleAddLike}
        >
          <img
            className="w-4"
            src={addLike ? colorHeart : heart}
            alt="likeBtn"
          />
          좋아요
        </button>
      </div>
      <div className="flex pt-4 justify-between">
        <h1 className="font-medium">{productData[0]?.postInfo[0].title}</h1>
        <p className="text-sm">
          📍 거래장소:{productData[0]?.postInfo[0].location}
        </p>
      </div>
      <p className="text-xs text-gray-500 pt-2">
        {productData[0]?.postInfo[0].category} &#183;{' '}
        <Moment fromNow>{startTime}</Moment>
      </p>
      <p className="font-medium pt-4">{productData[0]?.postInfo[0].price}</p>
      <p className="pt-4">{productData[0]?.postInfo[0].description}</p>
      <p className="text-xs text-gray-500 pt-4">
        좋아요 {productData[0]?.postInfo[0].likes} &#183; 조회{' '}
        {productData[0]?.postInfo[0].viewCount}
      </p>
    </section>
  );
}
