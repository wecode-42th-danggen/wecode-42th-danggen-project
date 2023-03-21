import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import AdminProject from './AdminProject';

function Table() {
  const data: { col1: string, col2: string }[] = React.useMemo(
    () => [
      {
        email: '이메일이에용',
        walletID: '아이디에용',
        created_at: '2021-08-03 01:14:47',
        edited_at: '2021-08-03 01:15:49',
        coin_list: ['TRV', 'BTC'],
      },
      {
        email: '이메일이에용',
        walletID: '아이디에용',
        created_at: '2021-08-03 01:14:47',
        edited_at: '2021-08-03 01:15:49',
        coin_list: ['TRV', 'BTC'],
      },
      {
        email: '이메일이에용',
        walletID: '아이디에용',
        created_at: '2021-08-03 01:14:47',
        edited_at: '2021-08-03 01:15:49',
        coin_list: ['TRV', 'BTC'],
      },
    ],
    []
  );

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'Email',
        accessor: 'email', // accessor is the "key" in the data
      },
      {
        Header: 'Wallet ID',
        accessor: 'wallet ID',
      },
      {
        Header: 'Wallet Balance',
        accessor: 'coin_list',
      },
      {
        Header: 'Created_at',
        accessor: 'created_at',
      },
      {
        Header: 'Edited At',
        accessor: 'edited_at',
      },
    ],
    []
  );
  const {
    getTableProps, //table props
    getTableBodyProps, //table body props
    headerGroups, //헤더들
    rows, //로우 데이터들
    prepareRow,
  } = useTable({ columns, data });
  return (
    <div className="flex w-3/5">
      <AdminProject />
      <table {...getTableProps} className="pt-96 pb-3 w-3/ h-52">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
