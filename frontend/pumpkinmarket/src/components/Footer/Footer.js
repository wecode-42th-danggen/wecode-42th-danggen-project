import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex justify-around items-center absolute bottom-0 left-0 w-full h-60 bg-gray-100">
      <div>
        <div className="pb-5">
          <p className="text-gray-500 text-sm">
            대표 | 방서빈, 이홍열, 장주성, 이수민
          </p>
          <p className="text-gray-500 text-sm">사업자번호 | 463-45-00033</p>
          <p className="text-gray-500 text-sm">
            주소 | 서울시 강남구 테헤란로 427 위워크 427 (호박서비스)
          </p>
          <p className="text-gray-500 text-sm">전화 | 1544-6666</p>
          <p className="text-gray-500 text-sm">
            고객 문의 | cs@pumkinmarket.com
          </p>
        </div>
        {REFERENCE_INFO.map(list => {
          return (
            <Link
              className="text-gray-500 text-sm font-semibold pr-5"
              key={list.id}
              to="/"
            >
              {list.title}
            </Link>
          );
        })}
      </div>
      <div className="flex text-center items-center ml-20">
        {FOOTER_IMG.map(list => {
          return (
            <img
              key={list.id}
              className="w-5 h-5 ml-5"
              src={list.img}
              alt={list.alt}
            />
          );
        })}
        <div className="flex ml-5 ">
          <img
            className="w-5 h-5"
            src="images/Footer/internet.png"
            alt="internet"
          />
          <p className="text-gray-500 ml-2 text-sm">한국어</p>
        </div>
      </div>
    </footer>
  );
}

const FOOTER_IMG = [
  { id: 1, img: 'images/Footer/facebook.png', alt: 'facebook' },
  { id: 2, img: 'images/Footer/instagram.png', alt: 'instagram' },
  { id: 3, img: 'images/Footer/youtube.png', alt: 'youtube' },
];

const REFERENCE_INFO = [
  {
    id: 1,
    title: '제휴 문의',
  },
  {
    id: 2,
    title: '광고 문의',
  },
  {
    id: 2,
    title: 'PR 문의',
  },
  {
    id: 3,
    title: 'IR 문의',
  },
];
