import { useState, createContext, useEffect } from 'react';
import { API } from '../../config/config';
export const MenuContext = createContext();
export const MenuProvider = props => {
  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`${API.POSTS}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: '',
      },
    })
      .then(res => res.json())
      .then(data => {
        setSearchData(data.data);
      });
  }, []);

  const [searchData, setSearchData] = useState([]);

  return (
    <MenuContext.Provider value={[searchData, setSearchData]}>
      {props.children}
    </MenuContext.Provider>
  );
};
