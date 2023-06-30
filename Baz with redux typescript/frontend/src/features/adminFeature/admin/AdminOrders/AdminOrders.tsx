import Hero from '../Layout/Hero';
import { useAppSelector } from '../../../../App/hooks';
import Table from '../../../../global_components/Table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { orderTableDataProps } from '../../../../types';

const AdminOrders = () => {
  const { orders } = useAppSelector((state) => state.admin);

  const tableData = orders.map((order) => {
    return {
      ...order,
      _id: <Link to={`/admin/order/detail/${order._id}`}>{order._id}</Link>,
      createdAt: order.createdAt.substring(0, 10),
    };
  });

  const columns = useMemo(
    () => [
      { Header: 'OrderID', accessor: '_id' },
      { Header: 'Date', accessor: 'createdAt' },
      { Header: 'Name', accessor: 'user.firstName' }, //some orders have just name instead
      {
        Header: 'Piece(s)',
        accessor: 'total_items',
        Cell: ({ cell: { value } }: { cell: { value: number } }) => (
          <span className='flex justify-center'>{value}</span>
        ),
      },
      { Header: 'Location', accessor: 'shippingInfo.city' },
      {
        Header: 'Status',
        accessor: 'orderStatus',
        Cell: ({ cell: { value } }: { cell: { value: string } }) => (
          <span
            className={`flex justify-center p-2 rounded-xl ${
              value === 'completed'
                ? 'bg-[#e8fee8] text-[#05e201]'
                : 'text-[#ed0000] bg-[#FFE4E4] rounded-[19px]'
            }`}>
            {value}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className='w-full'>
      <Hero
        title={'Orders'}
        description={"Stay up to date with your store's current status"}
      />
      <div className='flex flex-col gap-8 pt-[41px] p-12'>
        <div className='font-baz1 font-medium text-[28px]'>
          Order List ({orders.length})
        </div>
        <div className='w-full'>
          <Table columns={columns} data={tableData as orderTableDataProps} />
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
