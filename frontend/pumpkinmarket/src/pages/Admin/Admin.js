import React from 'react';
import { NavLink } from 'react-router-dom';

function Admin() {
  <>
    <div className="flex justify-start items-center pt-20 pb-96 w-96 pl-8 leading-9">
      <ul>
        <li>
          <NavLink to="/Member">회원관리</NavLink>
        </li>
        <li>
          <NavLink to="/Dealings">중고거래 게시글 관리</NavLink>
        </li>
        <li>
          <NavLink to="/Community">커뮤니티 게시글 관리</NavLink>
        </li>
      </ul>
    </div>
    ;
  </>;
}

export default Admin;
