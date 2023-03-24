import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuContext } from '../../components/Nav/MenuProvider';
import { API } from '../../config/config';
export default function ProductList() {
  const [searchData, setSearchData] = useContext(MenuContext);

  const Token = localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const goToPosting = () => {
    navigate('/posting');
  };

  const observer = new IntersectionObserver(
    entris => {
      entris.forEach(entry => {
        if (entry.isIntersecting) {
          loadMoreData();
        }
      });
    },
    { threshold: 0.5 }
  );

  const loadMoreData = async () => {
    const newData = await fetchMoreData();
    if (newData.length > 0) {
      setSearchData([...searchData, ...newData]);
    } else {
      observer.unobserve(targetRef.current);
    }
  };

  const fetchMoreData = async () => {
    const response = await fetch(`${API.POSTS}?offset=${searchData.length}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: Token,
      },
    });
    const data = await response.json();
    return data.data;
  };

  const targetRef = useRef(null);

  useEffect(() => {
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [observer, targetRef]);

  useEffect(() => {
    fetch(`${API.POSTS}`, {
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
  }, []);

  return (
    <div className="py-20">
      <section className="bg-lime-100">
        <div className="flex items-center justify-around">
          <button
            className="text-lg rounded-full p-1.5 bg-green-500 text-white text-sm w-20 fixed bottom-28 right-40 max-md:right-12"
            onClick={goToPosting}
          >
            + 글쓰기
          </button>
          <div>
            <h1 className="text-4xl font-bold pb-3">
              우리동네 안전 직거래 마켓
            </h1>
            <span className="text-lg">
              문정마켓에서 거래하며, <br />
              이웃들과 따뜻한 정을 느껴보아요
            </span>
          </div>
          <img
            className="w-80 my-20"
            src="/images/ProductList/market.png"
            alt="neighbor house img"
          />
        </div>
      </section>
      <section className="h-sreen">
        <div className="pt-14 flex flex-col items-center re">
          <h1 className="text-3xl font-semibold pb-20">문정마켓 매물</h1>
          <button
            className="text-lg rounded-full p-1.5 bg-green-500 text-white text-sm w-20 fixed bottom-28 right-40 max-md:right-12"
            onClick={goToPosting}
          >
            + 글쓰기
          </button>
          {searchData.length === 0 ? (
            <>
              <img
                className="w-28"
                src="/images/ProductList/nosearch.png"
                alt="no search product"
              />
              <div>검색된 상품이 없습니다</div>
            </>
          ) : (
            <div className="grid grid-cols-4 gap-12 max-md:grid-cols-2">
              {searchData.map(data => {
                return (
                  <Link
                    className="w-52"
                    key={data.id}
                    to={`/product/${data.id}`}
                  >
                    {data.postInfo.map(list => {
                      return (
                        <div key={list.id}>
                          <img
                            className="object-cover w-52 h-52 rounded-xl mb-2"
                            src={list.imageUrl}
                            alt="product"
                          />
                          <div>
                            <h2 className="pb-1">{list.title}</h2>
                            <p className="text-sm font-bold pb-1">
                              {list.price.toLocaleString()}원
                            </p>
                            <p className="text-xs text-zinc-500 pb-1">
                              좋아요 {list.likes}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
