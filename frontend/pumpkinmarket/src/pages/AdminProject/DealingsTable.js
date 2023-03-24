import React, { useState, useEffect } from 'react';
import './pagingCss.css';

function DealingsTable() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.194:4000/admin/posts`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setData(data.data);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  return (
    <div className="pl-72 pr-28 flex flex-col items-center justify-center max-w-5xl">
      <table className="border-spacing-0 border-solid border-2 w-[64rem] mr-96">
        <thead className="pt-52">
          <tr>
            <th className="border-r-2 border-b-2">userId</th>
            <th className="border-r-2 border-b-2">title</th>
            <th className="border-r-2 border-b-2">description</th>
            <th className="border-r-2 border-b-2">location</th>
            <th className="border-r-2 border-b-2">view_cnt</th>
            <th className="border-r-2 border-b-2">pull_uptime</th>
            <th className="border-r-2 border-b-2">post_status_id</th>
          </tr>
        </thead>
        <tbody>
          {records.map((user, i) => (
            <tr key={i}>
              <td className="p-1 border-r-2 border-b-2">{user.userId}</td>
              <td className="p-1 border-r-2 border-b-2">{user.title}</td>
              <td className="p-1 border-r-2 border-b-2">{user.description}</td>
              <td className="p-1 border-r-2 border-b-2">{user.location}</td>
              <td className="p-1 border-r-2 border-b-2">{user.viewCount}</td>
              <td className="p-1 border-r-2 border-b-2">{user.postStatus}</td>
              <td className="p-1 border-r-2 border-b-2">{user.pullUpTime}</td>
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

export default DealingsTable;
