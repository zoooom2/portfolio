import styled from 'styled-components';
import { SingleProductType } from '../../../types';
import { priceFormat } from '../../../utils/constants';

const BestSellerTable = ({
  contentArray = [],
}: {
  contentArray: SingleProductType[];
}) => {
  const tableContent = contentArray.map((content, index) => {
    const total = content.quantitySold * content.price;
    return (
      <tr key={index} className=''>
        <td className='productItem'>
          <img src={content.images[0]} alt='product' className='product-img' />
          <div className='product-details flex-column'>
            <div className='productName'>{content.productName}</div>
            <div className='price'>{priceFormat(content.price)}</div>
          </div>
        </td>
        <td>{content.quantitySold}</td>
        <td>{priceFormat(total)}</td>
      </tr>
    );
  });
  return (
    <Wrapper>
      <thead className=''>
        <tr className=''>
          <th>Item</th>
          <th>Piece(s)</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </Wrapper>
  );
};

const Wrapper = styled.table`
  border-collapse: separate;
  border-spacing: 20px;
  .productItem {
    display: flex;
    gap: 23px;
  }
  .productName {
    font-family: 'Poppins';
    font-size: 18px;
    line-height: 27px;
  }
  img {
    width: 51px;
    height: 51px;
    object-fit: cover;
    border: 1px solid #898989;
  }

  .price {
    font-family: 'Poppins';
    font-size: 14px;
    line-height: 21px;
    color: #9c9c9c;
    text-align: left;
  }
  th {
    text-align: left;
  }

  // thead {
  //   border: 1px solid red;
  // }
`;

export default BestSellerTable;
