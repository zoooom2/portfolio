import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { Loading, Error, ProductImages, AddToCart, Stars } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const [size, setSize] = useState(10);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_products_loading: loading,
    single_products_error: error,
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
      <div className='product-picture'>
        <img
          src={`/productImage/${images[0]}`}
          alt='product'
          className='product-img'
        />
      </div>
      <div className='product-details'></div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  grid-template-column: 50% 5;
  border: 1px solid rgba(0, 0, 0, 0.7);

  .product-picture: {
    border-right: 1px solid rgba(0, 0, 0, 0.7);
  }
`;

export default SingleProductPage;
