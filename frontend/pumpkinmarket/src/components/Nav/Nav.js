import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuContext } from '../Nav/MenuProvider';
import { API } from '../../config/config';

export default function Nav() {
  const [searchData, setSearchData] = useContext(MenuContext);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const searchBtn = () => {
    setIsClicked(prev => !prev);
  };

  const Token = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  const productSearch = e => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  };

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      setIsClicked(prev => !prev);
    }
  };

  const toMypage = () => {
    if (!Token) {
      alert('로그인이 필요한 서비스 입니다. \n로그인 하시겠습니까?');
      navigate('/login');
    } else if (Token) {
      navigate('/mypage');
    }
  };

  const toLogout = () => {
    alert('로그아웃하시겠습니까?');
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`${API.SEARCH}${searchKeyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setSearchData(data.data);
      });
  }, [searchKeyword]);

  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`${API.USERPROFILEIMG}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  }, []);

  return (
    <MenuContext.Provider value={[searchData, setSearchData]}>
      <nav className="flex justify-between items-center h-20 border border-gray-100 fixed bg-white w-full">
        <div>
          <Link className="font-bold text-xl ml-10" to="/">
            💝 문情
          </Link>
          <Link to="/" className="ml-10 text-lg">
            문정마켓
          </Link>
          <Link to="/neighborinfo-list" className="ml-10 text-lg">
            동네정보
          </Link>
          <Link to="/main" className="ml-10 text-lg">
            문情생활
          </Link>
        </div>
        <div>
          <input
            className="w-96 h-8 text-center border border-#d1d5db-600 rounded-sm text-sm max-md:hidden"
            placeholder=" 🔍     물품이나 동네를 검색해보세요"
            value={searchKeyword}
            onChange={productSearch}
            onKeyDown={handleOnKeyPress}
          />
        </div>
        {Token ? (
          <div className="flex items-center">
            <button className="hidden mr-3 max-md:block" onClick={searchBtn}>
              <img
                className="w-4"
                src="/images/Nav/search.png"
                alt="searchBtn"
              />
            </button>
            {isClicked && (
              <div className="hidden max-md:block">
                <input
                  className="w-96 h-8 text-center border border-#d1d5db-600 rounded-sm text-sm absolute top-20 left-28"
                  placeholder=" 🔍     물품이나 동네를 검색해보세요"
                  value={searchKeyword}
                  onChange={productSearch}
                  onKeyDown={handleOnKeyPress}
                />
              </div>
            )}
            <img
              className="w-7 h-7 rounded-full"
              src={
                userInfo.profileImageUrl
                  ? userInfo.profileImageUrl
                  : '/images/Nav/profile.png'
              }
              alt="profileImg"
            />
            <button
              className="text-lg text-gray-500 pr-1.5 text-sm ml-3 hover:text-gray-600"
              type="button"
              onClick={toMypage}
            >
              마이페이지
            </button>
            <button
              type="button"
              onClick={toLogout}
              className="text-lg text-gray-500 pr-1.5 text-sm mx-3 hover:text-gray-600"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex items-center">
              <button className="hidden mr-3 max-md:block" onClick={searchBtn}>
                <img
                  className="w-4"
                  src="/images/Nav/search.png"
                  alt="searchBtn"
                />
              </button>
              {isClicked && (
                <div className="hidden max-md:block">
                  <input
                    className="w-96 h-8 text-center border border-#d1d5db-600 rounded-sm text-sm absolute top-20 left-28"
                    placeholder=" 🔍     물품이나 동네를 검색해보세요"
                    value={searchKeyword}
                    onChange={productSearch}
                    onKeyDown={handleOnKeyPress}
                  />
                </div>
              )}
              <Link
                className="text-lg text-gray-500 pr-1.5 text-sm"
                to="/login"
              >
                로그인
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                className="text-lg text-gray-500 pl-1.5 text-sm mr-10"
                to="/sign-up"
              >
                회원가입
              </Link>
            </div>
          </div>
        )}
      </nav>
    </MenuContext.Provider>
  );
}
