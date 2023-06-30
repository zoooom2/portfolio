import { useTable, Column } from 'react-table';
import { OrderType } from '../types';

interface TableProps {
  columns: Column[];
  data: any[];
}

const Table = ({ columns, data }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table {...getTableProps()} className='font-baz1 w-full'>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <tr
              className='border border-solid border-[rgb(192,192,192)]'
              {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className='text-left p-3 font-baz1 text-[16px] text-[#2a2a2a]'
                  {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr className=' hover:bg-[rgba(0,0,0,0.05)]' {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className='text-[18px] max-md:text-sm font-baz1 px-2 py-6 text-left'
                    {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
