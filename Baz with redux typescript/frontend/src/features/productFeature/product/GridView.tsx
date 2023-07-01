import styled from 'styled-components';
import { SingleProductType } from '../../../types';
import Product from './Product';

const GridView = ({ products }: { products: SingleProductType[] }) => {
  return (
    <Wrapper>
      <div className='products-container'>
        {products.map((product) => {
          const { _id: id } = product;

          return <Product key={id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    background: transparent;
  }

  .products-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  // @media (min-width: 480px) {
  //   .products-container {
  //     grid-template-columns: repeat(2, 1fr);
  //   }
  // }

  @media (min-width: 768px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default GridView;
