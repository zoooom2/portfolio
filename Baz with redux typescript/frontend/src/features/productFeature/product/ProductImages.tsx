import { useState } from 'react';
import styled from 'styled-components';

const ProductImages = ({ images = [] }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <Wrapper className='p-5'>
      <div className='w-full h-[500px] flex justify-center'>
        <img src={images[index]} alt='main' className='object-contain h-full' />
      </div>

      <div className='gallery'>
        {images.map((image, count) => {
          return (
            <img
              src={image}
              alt=''
              key={count}
              className={`preview ${image === images[index] ? 'active' : null}`}
              onClick={() => setIndex(count)}
            />
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

    .preview {
      width: 125px;
      cursor: pointer;
      height: 150px;
      object-fit: cover;
    }
  }

  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }

  @media (max-width: 576px) {
    .main {
      height: 300px;
      width: auto;
      object-fit: cover;
    }

    .gallery {
      grid-template-columns: repeat(5, minmax(80px, 1fr));

      --gallery-column-gap: 1rem;
    }
  }

  @media (min-width: 992px) {
    .main {
      height: 400px;
      width: auto;
    }

    .gallery {
      --gallery-column-gap: 1rem;
    }
  }
`;

export default ProductImages;
