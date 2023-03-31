import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';
import Conditions from './Conditions';

const CartTotals = () => {
  const { total_amount } = useCartContext();
  return (
    <Wrapper>
      <div className='subtotal-price'>
        <div className='subtotal'>Subtotal:</div>
        <div className='price'>₦{total_amount}</div>
      </div>
      <Conditions />
      <button className='checkout-btn'>Checkout</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 3em;
  .subtotal-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.5px;
  }
  .checkout-btn {
    padding: 30px 195px;
    gap: 15px;
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    color: #000000;
  }
`;

export default CartTotals;
