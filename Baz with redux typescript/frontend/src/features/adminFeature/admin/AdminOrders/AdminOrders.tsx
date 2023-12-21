import Hero from '../Layout/Hero';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import Table from '../../../../global_components/Table';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderTableDataProps } from '../../../../types';
import { priceFormat } from '../../../../utils/constants';
import { changeSideMenuValue } from '../../adminSlice';

const AdminOrders = () => {
  const { orders } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changeSideMenuValue('order'));
  }, []);

  const tableData = orders.map((order) => {
    return {
      ...order,
      shippingInfo: {
        ...order.shippingInfo,
        state: order.shippingInfo.state?.startsWith('Abuja')
          ? 'Abuja'
          : order.shippingInfo.state,
      },
      total_amount: priceFormat(order.total_amount),
      createdAt: order.createdAt.substring(0, 10),
    };
  });

  const columns = useMemo(
    () => [
      // { Header: 'Name', accessor: 'shippingInfo.firstName' },
      { Header: 'Reference', accessor: 'paymentInfo.reference' }, //some orders have just name instead
      { Header: 'Date', accessor: 'createdAt' },
      {
        Header: 'Piece(s)',
        accessor: 'total_items',
        Cell: ({ cell: { value } }: { cell: { value: number } }) => (
          <span className='flex justify-center'>{value}</span>
        ),
      },
      { Header: 'Location', accessor: 'shippingInfo.state' },
      { Header: 'Total Amount', accessor: 'total_amount' },
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
      <div className='flex flex-col gap-8 pt-[41px] px-[16px] tablet:p-12'>
        <div className='font-baz1 font-medium text-[22px] tablet:text-[28px]'>
          Order List ({orders.length})
        </div>
        <div className='w-full overflow-auto'>
          <Table
            columns={columns}
            data={tableData as orderTableDataProps}
            handleClick={(e) => {
              navigate(`/admin/order/detail/${e.original._id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
