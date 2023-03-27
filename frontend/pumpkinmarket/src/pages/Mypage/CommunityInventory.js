import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../../config/config';

export default function CommunityInventory() {
  const [communityInventory, setCommuntiyInventory] = useState([]);
  console.log(communityInventory);
  const Token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetch(`${API.MYPAGE}/community-posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpc3MiOiJ3YWVtLWRhbmdnZW4iLCJpYXQiOjE2Nzk2NjY0ODcsImV4cCI6MTQ1MTIzMTg0NDc2ODAwfQ.PIHokLiq9ho1e5e3xhi0q-V4TRtRUyNIRgfrBUpUFzM',
      },
    })
      .then(res => res.json())
      .then(data => {
        setCommuntiyInventory(data.data);
      });
  }, []);

  const handleDelteBtn = postId => {
    setCommuntiyInventory(postId);
    fetch(`${API.COMMUNITY}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // authorization: Token,
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJpc3MiOiJ3YWVtLWRhbmdnZW4iLCJpYXQiOjE2Nzk2NjY0ODcsImV4cCI6MTQ1MTIzMTg0NDc2ODAwfQ.PIHokLiq9ho1e5e3xhi0q-V4TRtRUyNIRgfrBUpUFzM',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.message === 'DELETE_COMMUNITY_POST') {
          setCommuntiyInventory(
            communityInventory.filter(post => post.postId !== postId)
          );
        }
        alert('게시글이 삭제되었습니다!');
      });
  };

  return (
    <div className="flex justify-center">
      <ul>
        {communityInventory?.map(list => {
          return (
            <li key={list.id} className="flex justify-between">
              <div className="p-5">
                <hr className="pb-7" />
                <h1 className="font-bold pb-3 pl-2">{list.title}</h1>
                <div className="flex items-center">
                  <p className="text-ellipsis overflow-hidden break-words line-clamp-2 w-[44rem] h-12 pl-2">
                    {list.description}
                  </p>
                  <img
                    className="w-20 h-20 rounded-lg object-cover mx-7"
                    src={list.image_url}
                    alt="inventory title img"
                  />
                  <button
                    type="button"
                    onClick={() => handleDelteBtn(list.postId)}
                  >
                    <img
                      className="w-4 h-4"
                      src="/images/Mypage/wastebasket.png"
                      alt="delete inventory"
                    />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
