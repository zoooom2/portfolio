import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { SingleProductType } from '../../../types';
const ListView = ({ products }: { products: SingleProductType[] }) => {
  return (
    <Wrapper className='flex flex-col'>
      {products.map((product) => {
        const { _id: id, images, productName: name, price } = product;
        return (
          <Link
            to={`/shop/${id}`}
            key={id}
            className='border-b border-black flex flex-col h-[50vh]'>
            <figure className='place-items-center h-3/4 flex justify-center'>
              <img
                src={images[0]}
                alt={name}
                className='aspect-[230/317] h-full object-contain'
              />
            </figure>
            <div className='h-1/4'>
              <h4>{name}</h4>
              <h5 className='price'>{`₦${price}`}</h5>
            </div>
          </Link>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  // display: grid;
  // row-gap: 3rem;

  // img {
  //   width: 100%;
  //   display: block;
  //   width: 300px;
  //   height: 200px;
  //   object-fit: cover;
  //   border-radius: var(--radius);
  //   margin-bottom: 1rem;
  // }
  // h4 {
  //   margin-bottom: 0.5rem;
  // }
  // .price {
  //   color: var(--clr-primary-6);
  //   margin-bottom: 0.75rem;
  // }
  // p {
  //   max-width: 45em;
  //   margin-bottom: 1rem;
  // }
  // .btn {
  //   font-size: 0.5rem;
  //   padding: 0.25rem 0.5rem;
  // }
  // @media (min-width: 992px) {
  //   article {
  //     display: grid;
  //     grid-template-columns: auto 1fr;
  //     column-gap: 2rem;
  //     align-items: center;
  //   }
  // }
`;

export default ListView;
