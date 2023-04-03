import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Product = ({ images, _id: id, productName: name, price, stock }) => {
  return (
    <Wrapper>
      <div className='container'>
        <Link to={`/shop/${id}`}>
          <img src={`/productImage/${images && images[0]}`} alt={name} />
        </Link>
      </div>
      <footer>
        <h5 className='name'>{name}</h5>
        <div className='price-stock'>
          <p className={stock > 0 ? null : 'soldout'}>{`₦${price} `}</p>
          <p>{stock > 0 ? null : ' Sold-Out'}</p>
        </div>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  border-right: 1px solid rgba(0, 0, 0, 1);
  border-bottom: 1px solid black;
  padding-bottom: 0.5em;
  .container {
    position: relative;
    background: transparent;
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    padding-inline: 1em;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
  .name {
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 400;
    font-size: 15.9261px;
    line-height: 25px;
    letter-spacing: 0.1em;
  }
  footer > div > p {
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 400;
    font-size: 20.9261px;
    line-height: 25px;
    letter-spacing: 0.1em;
    color: black;
  }
  .soldout {
    text-decoration: line-through;
  }
  .price-stock {
    display: flex;
    gap: 1em;
  }
`;
export default Product;
