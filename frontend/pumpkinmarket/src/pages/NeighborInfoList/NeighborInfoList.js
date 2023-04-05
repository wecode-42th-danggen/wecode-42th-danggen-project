import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AllNeighborInfo from './AllNeighborInfo';
import NeighborIncident from './NeighborIncident';
import NeighborInformation from './NeighborInformation';
import NeighborRestaurant from './NeighborRestaurant';
import { API } from '../../config/config';

export default function NeighborInfoList() {
  const [navigate, setNavigate] = useState('전체');
  const [allNeighborInfo, setAllNeighborInfo] = useState([]);
  const [postCategoryID, setPostCategoryID] = useState(null);

  const navigated = useNavigate();

  const goToPosting = () => {
    navigated('/neighborinfo-posting');
  };

  const onClickCategory = (category, id) => {
    setNavigate(category);
    setPostCategoryID(id);
  };

  const categoryNavigate = () => {
    if (navigate === '전체') {
      return <AllNeighborInfo allNeighborInfo={allNeighborInfo} />;
    } else if (navigate === '동네 정보') {
      return <NeighborInformation postCategoryID={postCategoryID} />;
    } else if (navigate === '맛집/카페') {
      return <NeighborRestaurant postCategoryID={postCategoryID} />;
    } else if (navigate === '동네 사건/사고') {
      return <NeighborIncident postCategoryID={postCategoryID} />;
    }
  };

  useEffect(() => {
    fetch(`${API.COMMUNITY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setAllNeighborInfo(data.data);
      });
  }, []);

  return (
    <>
      <section className="pt-20 bg-amber-50">
        <div className="flex items-center justify-around">
          <button
            className="text-lg rounded-full p-1.5 bg-green-500 text-white text-sm w-20 fixed bottom-28 right-40 max-md:right-12"
            onClick={goToPosting}
          >
            + 글쓰기
          </button>
          <div>
            <h1 className="text-3xl font-bold pb-3">
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
                  className={
                    navigate === category.title
                      ? 'visited: bg-lime-100 rounded-full mr-5 last:mr-0 text-sm p-1'
                      : 'bg-slate-100 rounded-full mr-5 last:mr-0 text-sm p-1'
                  }
                >
                  <Link
                    onClick={() => onClickCategory(category.title, category.id)}
                  >
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
    id: 0,
    title: '전체',
  },
  {
    id: 1,
    title: '동네 정보',
  },
  {
    id: 2,
    title: '맛집/카페',
  },
  {
    id: 3,
    title: '동네 사건/사고',
  },
];
