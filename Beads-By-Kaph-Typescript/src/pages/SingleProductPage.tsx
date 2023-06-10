import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { single_product_url as url } from '../utils/constants';
import { Loading, Error, ProductImages, AddToCart, Stars } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../context/contextHooks';

const SingleProductPage = () => {
  const [size, setSize] = useState(10);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  const {
    productName,
    price,
    description,
    discount,
    images,
    ratingsAverage,
    reviews,
    stock,
    category,
    numberOfReviews,
    id: sku,
  } = product;

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{productName}</h2>
            <Stars stars={ratingsAverage} reviews={numberOfReviews} />
            <h5 className='price'>{`₦${price}`}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available :</span>
              {stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className='info '>
              <span>SKU :</span>
              {id}
            </p>
            {category !== 'waistbeads' && (
              <p className='info'>
                <span>Size(inches) :</span>
                <input
                  type='number'
                  name='size'
                  value={size}
                  id='sizeNum'
                  min={10}
                  max={60}
                  onChange={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                      const { value } = e.target;
                      setSize(+value);
                    }
                  }}
                />
              </p>
            )}

            <hr />
            {stock > 0 && <AddToCart product={product} size={size} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  #sizeNum {
    width: 50px;
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .content {
    // border: 1px solid red;
    height: 100%;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
