import { OrderType } from '../../../types';
import { priceFormat } from '../../../utils/constants';

type AdminRecentOrderTableProps = {
  header: ['Name', 'Piece(s)', 'Price', 'Status'];
  content: ['username', 'total_items', 'total_amount', 'orderStatus'];
  contentArray: OrderType[];
};

const AdminRecentOrderTable = ({
  header,
  content,
  contentArray = [],
}: AdminRecentOrderTableProps) => {
  const headers = header.map((x, i) => <th key={i}>{x}</th>);
  const tableContent = contentArray.map((x, i) => (
    <tr key={i}>
      {content.map((details, index) =>
        details === 'orderStatus' ? (
          <td key={index}>
            <span className='status'>{x[details]}</span>
          </td>
        ) : details === 'total_amount' ? (
          <td key={index}>{priceFormat(x[details])}</td>
        ) : details === 'total_items' ? (
          <td key={index}>{x[details]}</td>
        ) : (
          <td key={index}>{x.user[details]}</td>
        )
      )}
    </tr>
  ));
  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
};

export default AdminRecentOrderTable;
