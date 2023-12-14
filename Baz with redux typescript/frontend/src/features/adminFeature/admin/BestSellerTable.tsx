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
            <div className='font-baz1 text-[14px] tablet:text-[18px] leading-[27px]'>
              {content.productName}
            </div>
            <div className='font-baz1 tablet:text-[14px] text-[10px] leading-[21px] text-[#9c9c9c] text-left'>
              {priceFormat(content.price)}
            </div>
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
          <th className=''>Item</th>
          <th>Piece(s)</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </Wrapper>
  );
};

const Wrapper = styled.table`
  width: 100%;
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
      font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #2a2a2a;
    text-align: center;
    @media (max-width: 640px) {
      font-size: 14px;
    }
    
  }
   td {
     font-family: 'Poppins';
    font-size: 16px;
    line-height: 27px;
    text-align:center;
    @media (max-width: 640px) {
      text-align:center;
      font-size: 12px;
    }
`;

export default BestSellerTable;
