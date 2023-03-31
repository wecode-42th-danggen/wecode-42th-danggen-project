import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { API } from '../../config/config';

export default function NeighborRestaurant({ postCategoryID }) {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    fetch(`${API.CATEGORY}${postCategoryID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setRestaurant(data.data);
      });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 py-10">
      {restaurant.map(data => {
        return (
          <Link key={data.cmpostId} to={`/neighborinfo/${data.cmpostId}`}>
            {data.cmpostInfo.map(list => {
              return (
                <div
                  className="border-t border-solid border-slate-200 pl-5"
                  key={list.postId}
                >
                  <div className="mt-5">
                    <span className="bg-slate-100 p-1 rounded-xl text-sm">
                      {list.postCategoryName}
                    </span>
                    <div className="flex mt-3">
                      {list.postImageUrl === null ? (
                        ''
                      ) : (
                        <img
                          className="w-20 h-20 rounded-xl"
                          src={list.postImageUrl}
                          alt="neighborInfo title img"
                        />
                      )}
                      <div>
                        <p className="pl-3 font-semibold pb-2">
                          {list.postTitle}
                        </p>
                        <p className="text-ellipsis overflow-hidden break-words line-clamp-2 w-80 h-10 pl-3 mr-8 text-sm">
                          {list.postDescription}
                        </p>
                        <Moment
                          fromNow
                          className="pl-3 text-xs text-gray-500 pt-4"
                        >
                          {new Date(list.postCreateTime)}
                        </Moment>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Link>
        );
      })}
    </div>
  );
}
