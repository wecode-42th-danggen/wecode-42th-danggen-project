import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AllNeighborInfo from './AllNeighborInfo';
import NeighborIncident from './NeighborIncident';
import Incident from './NeighborIncident';
import NeighborInformation from './NeighborInformation';
import Information from './NeighborInformation';
import NeighborRestaurant from './NeighborRestaurant';
import Restaurant from './NeighborRestaurant';

export default function NeighborInfoList() {
  const [navigate, setNavigate] = useState('전체');

  const onClickCategory = category => {
    setNavigate(category);
  };

  const categoryNavigate = () => {
    if (navigate === '전체') {
      return <AllNeighborInfo />;
    } else if (navigate === '동네 정보') {
      return <NeighborInformation />;
    } else if (navigate === '맛집/카페') {
      return <NeighborRestaurant />;
    } else if (navigate === '동네 사건/사고') {
      return <NeighborIncident />;
    }
  };

  return (
    <>
      <section className="pt-20 bg-amber-50">
        <div className="flex items-center justify-around">
          <div>
            <h1 className="text-4xl font-bold pb-3">
              문情 생활 이렇게 해보세요.
            </h1>
            <span className="text-lg">
              우리 동네의 다양한 소식들을 <br />
              이웃들과 함께 나누어요
            </span>
          </div>
          <img
            className="w-96"
            src="/images/Neighbor/village.png"
            alt="neighbor house img"
          />
        </div>
      </section>
      <section className="flex flex-col items-center pt-10">
        <h1 className="text-2xl font-bold pb-3">다양한 동네 소식을 공유해요</h1>
        <nav>
          <ul className="flex pt-5">
            {CATEGORY.map(category => {
              return (
                <li
                  key={category.id}
                  className="bg-slate-200 rounded-full mr-5 last:mr-0 p-2"
                >
                  <Link onClick={() => onClickCategory(category.title)}>
                    {category.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {categoryNavigate()}
      </section>
    </>
  );
}

const CATEGORY = [
  {
    id: 1,
    title: '전체',
  },
  {
    id: 2,
    title: '동네 정보',
  },
  {
    id: 3,
    title: '맛집/카페',
  },
  {
    id: 4,
    title: '동네 사건/사고',
  },
];
