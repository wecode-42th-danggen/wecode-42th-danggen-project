import React, { useState, useEffect } from 'react';
import './pagingCss.css';

function MemberTable() {
  const [Data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://192.168.0.194:4000/admin/users`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data.data);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  return (
    <div className="pl-72 pr-28 flex flex-col items-center justify-center max-w-5xl">
      <table className="border-spacing-0 border-solid border-2">
        <thead className="pt-52">
          <tr>
            <th className="border-r-2 border-b-2">id</th>
            <th className="border-r-2 border-b-2">name</th>
            <th className="border-r-2 border-b-2">nickname</th>
            <th className="border-r-2 border-b-2">email</th>
            <th className="border-r-2 border-b-2">phone_number</th>
            <th className="border-r-2 border-b-2">user_status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((user, i) => (
            <tr key={i}>
              <td className="p-1 border-r-2 border-b-2">{user.id}</td>
              <td className="p-1 border-r-2 border-b-2">{user.name}</td>
              <td className="p-1 border-r-2 border-b-2">{user.nickname}</td>
              <td className="p-1 border-r-2 border-b-2">{user.email}</td>
              <td className="p-1 border-r-2 border-b-2">{user.phone_number}</td>
              <td className="p-1 border-r-2 border-b-2">{user.user_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prevPage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? 'active' : ''}`}
              key={i}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default MemberTable;
