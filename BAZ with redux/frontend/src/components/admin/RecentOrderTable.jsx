import PropTypes from 'prop-types';
import { priceFormat } from '../../utils/constants';

const AdminRecentOrderTable = ({ header, content, contentArray }) => {
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
        ) : (
          <td key={index}>{x[details]}</td>
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

AdminRecentOrderTable.propTypes = {
  header: PropTypes.array.isRequired,
  content: PropTypes.array.isRequired,
  contentArray: PropTypes.array.isRequired,
};

AdminRecentOrderTable.defaultProps = {
  header: [],
  content: [],
  contentArray: [],
};

export default AdminRecentOrderTable;
