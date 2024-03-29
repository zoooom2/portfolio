import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../utils/helpers';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { priceFormat } from '../../utils/constants';
import { useCartContext } from '../../context/cart_context';

const Product = ({ images, _id: id, productName: name, price, stock }) => {
  return (
    <Wrapper>
      <div className='container '>
        <Link to={`/shop/${id}`} className='place-center'>
          <img src={images && images[0]} alt={name} />
        </Link>
      </div>
      <footer className='flex-column'>
        <h5 className='name'>{name}</h5>
        <div className='price-stock'>
          <p className={stock > 0 ? null : 'soldout'}>{priceFormat(price)}</p>
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
  .container > a {
    display: flex;
  }
  img {
    width: 60%;
  }
  footer {
    margin-top: 1rem;

    gap: 1em;
    padding-inline: 1em;
    display: flex;
    justify-content: space-between;
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
    font-size: 15.9261px;
    line-height: 25px;
    letter-spacing: 0.1em;
  }
  footer > div > p {
    font-family: 'Zilla Slab';
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
  .add-to-cart-btn {
    background: transparent;
    padding-inline: 1em;
    border: 1px solid black;
    transition: var(--transition);
    cursor: pointer;
    &:hover {
      color: white;
      background: black;
    }
  }
`;
export default Product;
