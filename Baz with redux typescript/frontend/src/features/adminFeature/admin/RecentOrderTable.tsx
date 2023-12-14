import { useMemo } from 'react';
import { OrderType } from '../../../types';
import { priceFormat } from '../../../utils/constants';
import Table from '../../../global_components/Table';
import styled from 'styled-components';

type AdminRecentOrderTableProps = {
  contentArray: OrderType[];
};

const AdminRecentOrderTable = ({
  contentArray = [],
}: AdminRecentOrderTableProps) => {
  const columns = useMemo(
    () => [
      { Header: 'reference', accessor: 'paymentInfo.reference' },
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

  return (
    <Wrapper>
      <Table columns={columns} data={contentArray} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  overflow: scroll;
  table {
    width: 100%;
  }
  th {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #2a2a2a;
    text-align: center;
    background: pink;
    text-transform: capitalize;
    @media (max-width: 640px) {
      font-size: 14px;
    }
  }
  td {
    font-family: 'Poppins';
    font-size: 16px;
    line-height: 27px;
    text-align: center;
    @media (max-width: 640px) {
      font-size: 12px;
    }
  }
`;

export default AdminRecentOrderTable;
