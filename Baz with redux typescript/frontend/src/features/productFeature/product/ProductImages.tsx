import { useState } from 'react';
import styled from 'styled-components';

const ProductImages = ({ images = [] }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <Wrapper className='p-5'>
      <div className='w-full h-auto flex justify-center'>
        <img src={images[index]} alt='main' className='object-contain h-full' />
      </div>

      <div className='gallery'>
        {images.map((image, count) => {
          return (
            <div
              className={`flex items-center${
                image === images[index] ? 'active' : null
              } p-3 h-[150px] w-[125px] cursor-pointer object-contain`}>
              <img
                src={image}
                alt=''
                key={count}
                onClick={() => setIndex(count)}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  place-items: center;

  .gallery {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.5rem;
  }

  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }

  // @media (max-width: 576px) {
  //   .main {
  //     height: 300px;
  //     width: auto;
  //     object-fit: contain;
  //   }

  //   .gallery {
  //     grid-template-columns: repeat(5, minmax(80px, 1fr));

  //     --gallery-column-gap: 1rem;
  //   }
  // }

  // @media (min-width: 992px) {
  //   .main {
  //     height: 400px;
  //     width: auto;
  //   }

  //   .gallery {
  //     --gallery-column-gap: 1rem;
  //   }
  }
`;

export default ProductImages;
