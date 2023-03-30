import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/ko';
import { API } from '../../config/config';
import Comment from './Comment';

export default function NeighborInfo() {
  const [neighborInfo, setNeighborInfo] = useState([]);

  const cookies = document.cookie;

  const startTime = new Date(neighborInfo[0]?.cmpostInfo.postCreateTime);

  const headers = new Headers();
  headers.append('cookie', cookies);

  const Token = localStorage.getItem('accessToken');

  const params = useParams();

  const img = neighborInfo[0]?.cmpostInfo.postImageUrl;

  useEffect(() => {
    fetch(`${API.COMMUNITY}/${params.cmpostId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: Token,
        headers: cookies,
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setNeighborInfo(data.data);
      });
  }, [params.cmpostId]);

  return (
    <section className="py-32 flex flex-col m-auto w-[32rem]">
      <div>
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src="/images/Nav/profile.png"
            alt="user profile img"
          />
          <p className="pl-2 text-sm font-normal">
            {neighborInfo[0]?.cmpostInfo.postUserNickname}
          </p>
        </div>
        <span className="bg-slate-100 p-1 rounded-xl text-sm ml-9">
          {neighborInfo[0]?.cmpostInfo.postCategoryName}
        </span>
        <h1 className="font-bold pt-3">
          {neighborInfo[0]?.cmpostInfo.postTitle}
        </h1>
        <p className="pt-3">{neighborInfo[0]?.cmpostInfo.postDescription}</p>
        {img === null ? (
          ''
        ) : (
          <img
            src={neighborInfo[0]?.cmpostInfo.postImageUrl}
            alt="neighbor info posting img"
            className="object-cover w-[32rem] h-96 rounded-lg pt-3"
          />
        )}
      </div>
      <p className="text-xs text-gray-500 pt-2">
        조회 {neighborInfo[0]?.cmpostInfo.postViewCount} &#183;{' '}
        <Moment fromNow>{startTime}</Moment>
      </p>
      <Comment neighborInfo={neighborInfo} setNeighborInfo={setNeighborInfo} />
    </section>
  );
}
