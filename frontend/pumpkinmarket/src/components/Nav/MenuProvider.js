import { useState, createContext, useEffect } from 'react';
export const MenuContext = createContext();
export const MenuProvider = props => {
  // useEffect(() => {
  //   fetch('./data/data.json', {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setSearchData(data.data);
  //     });
  // }, []);

  // TOFIX: API 연결 시 동작할 코드
  useEffect(() => {
    fetch(`http://192.168.0.194:4000/posts`, {
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
