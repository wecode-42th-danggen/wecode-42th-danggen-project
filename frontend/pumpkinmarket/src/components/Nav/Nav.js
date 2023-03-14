import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const Token = localStorage.getItem('token');
  const navigate = useNavigate();

  const productSearch = e => {
    setSearchKeyword(e.target.value);
  };

  const filteredProduct = searchData.filter(list =>
    list.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const toChatting = () => {
    if (!Token) {
      alert('로그인이 필요한 서이스 입니다. \n로그인 하시겠습니까?');
      navigate('/login');
    } else if (Token) {
      navigate('/chatting');
    }
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setSearchData(data));
  }, []);

  return (
    <nav className="flex justify-around items-center h-20 border border-gray-100">
      <div>
        <Link className="text-green-600 font-bold text-xl pr-1.5" to="/">
          호박마켓
        </Link>
        <Link to="/product-list" className="text-xl">
          중고거래
        </Link>
      </div>
      <div>
        <input
          className="w-96 text-center border border-#d1d5db-600 rounded-sm"
          placeholder=" 🔍     물품이나 동네를 검색해보세요"
          value={searchKeyword}
          onChange={productSearch}
        />
      </div>
      {Token ? (
        <div className="flex items-center ">
          <img
            className="w-7 h-7"
            src="./images/Nav/profileImg.png"
            alt="profileImg"
          />
          <button
            className="text-lg rounded-md p-1.5 bg-green-500 text-white ml-3.5"
            type="button"
            onClick={toChatting}
          >
            채팅하기
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <Link className="text-lg text-gray-500 pr-1.5" to="/login">
            로그인
          </Link>
          <span className="text-gray-500">|</span>
          <Link className="text-lg text-gray-500 pl-1.5" to="/sign-up">
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
}
