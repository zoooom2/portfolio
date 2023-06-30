import { useMemo } from 'react';
import { OrderType } from '../../../types';
import { priceFormat } from '../../../utils/constants';
import Table from '../../../global_components/Table';

type AdminRecentOrderTableProps = {
  contentArray: OrderType[];
};

const AdminRecentOrderTable = ({
  contentArray = [],
}: AdminRecentOrderTableProps) => {
  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'user.username' },
      { Header: 'Piece(s)', accessor: 'total_items' },
      {
        Header: 'Price',
        accessor: 'total_amount',
        Cell: ({ cell: { value } }: { cell: { value: number } }) => (
          <span className='flex justify-center'>{priceFormat(value)}</span>
        ),
      },
      {
        Header: 'Status',
        accessor: 'orderStatus',
      },
    ],
    []
  );

  return <Table columns={columns} data={contentArray} />;
};

export default AdminRecentOrderTable;
