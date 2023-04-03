import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { _id: id, stock, category } = product;
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState('');

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  const handleClick = (e) => {
    const value = e.target.value;
    setSize(value);
  };

  return (
    <Wrapper className='size'>
      <AmountButtons increase={increase} decrease={decrease} amount={amount} />
      <div className='size-guide'>size guide</div>
      <select
        name='size'
        className='size-select'
        defaultValue={'none'}
        onChange={handleClick}>
        <option value='none' disabled>
          Select a Size
        </option>
        <option value='small'>Small</option>
        <option value='medium'>Medium</option>
        <option value='large'>Large</option>
        <option value='x-large'>X-Large</option>
        <option value='2x-large'>2x-large</option>
      </select>
      <button
        className='add-cart-btn'
        onClick={() => {
          addToCart(id, amount, product, size);
        }}
        disabled={size ? false : true}>
        Add To Cart
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .size {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
  }
  .size-guide {
    font-family: 'Bell MT';
    font-size: 18px;
    line-height: 20px;
    /* identical to box height */
    margin-left: auto;
    text-decoration-line: underline;
  }
  .size-select {
    padding: 31.5px 24px;
    gap: 15px;
    width: 100%;
    border: 1.5px solid black;
    // drop down arrow
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.5rem center;
    background-size: 1em;
    cursor: pointer;
  }
  .add-cart-btn {
    padding-block: 1em;
    gap: 15px;
    background: #000000;
    border: 1.5px solid #000000;
    width: 100%;
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    color: #ffffff;
    transition: var(--transition);
    cursor: pointer;
    &:hover {
      transform: scale(1.01);
    }
  }
`;
export default AddToCart;
