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
      alert('로그인이 필요한 서비스 입니다. \n로그인 하시겠습니까?');
      navigate('/login');
    } else if (Token) {
      navigate('/chatting');
    }
  };

  const toLogout = () => {
    alert('로그아웃하시겠습니까?');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setSearchData(data));
  }, []);

  return (
    <nav className="flex justify-around items-center h-20 border border-gray-100 fixed bg-white w-full">
      <div>
        <Link className="font-bold text-xl pr-1.5" to="/">
          💝 문情
        </Link>
        <Link to="/product-list" className="ml-10 text-lg">
          중고거래
        </Link>
        <Link to="/product-list" className="ml-10 text-lg">
          동네정보
        </Link>
      </div>
      <div>
        <input
          className="w-96 h-8 text-center border border-#d1d5db-600 rounded-sm text-sm max-md:hidden"
          placeholder=" 🔍     물품이나 동네를 검색해보세요"
          value={searchKeyword}
          onChange={productSearch}
        />
      </div>
      {Token ? (
        <div className="flex items-center ">
          <button type="button" onClick={toLogout}>
            <img
              className="w-7 h-7"
              src="images/Nav/profile.png"
              alt="profileImg"
            />
          </button>
          <button
            className="text-lg rounded-md p-1.5 bg-green-500 text-white ml-3.5 text-sm"
            type="button"
            onClick={toChatting}
          >
            채팅하기
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="flex items-center">
            <button className="hidden mr-3 max-md:block">
              <img
                className="w-4"
                src="images/Nav/search.png"
                alt="searchBtn"
              />
            </button>
            <Link className="text-lg text-gray-500 pr-1.5 text-sm" to="/login">
              로그인
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              className="text-lg text-gray-500 pl-1.5 text-sm"
              to="/sign-up"
            >
              회원가입
            </Link>
          </div>
          <button
            className="text-lg rounded-md p-1.5 bg-green-500 text-white ml-3.5 text-sm"
            type="button"
            onClick={toChatting}
          >
            채팅하기
          </button>
        </div>
      )}
    </nav>
  );
}
