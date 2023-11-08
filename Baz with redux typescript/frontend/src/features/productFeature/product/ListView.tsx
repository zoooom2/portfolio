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
            className='border-b border-black flex flex-col h-[50vh] px-[24px] py-2'>
            <figure className='place-items-center h-3/4 flex justify-center'>
              <img
                src={images[0]}
                alt={name}
                className='aspect-[230/317] h-full object-contain'
              />
            </figure>
            <div className='h-1/4 flex flex-col gap-2 items-center'>
              <h4 className='text-baz-black font-baz2 text-[16px] font-semibold tracking-[1.6px]'>
                {name}
              </h4>
              <h5 className='font-baz1 text-[16px]'>{`₦${price}`}</h5>
            </div>
          </Link>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default ListView;
