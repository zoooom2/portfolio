import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { priceFormat } from '../utils/constants';
import { useUserContext } from '../context/user_context';

import { Link } from 'react-router-dom';
import Conditions from './Conditions';

const CartTotals = () => {
  const { total_amount } = useCartContext();
  return (
    <Wrapper>
      <div className='subtotal-price flex-column'>
        <div className='subtotal'>Subtotal:</div>
        <div className='price'>{priceFormat(total_amount)}</div>
      </div>
      <Conditions />
      <div className='toCheckout'>
        <Link to='/checkout/information' className='btn checkout-btn zilla-700'>
          Checkout
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5em;
  @media (max-width: 768px) {
    padding: 3em;
  }
  .subtotal {
    font-family: 'Bell MT';
    font-size: 21px;
    line-height: 23px;
  }
  .price {
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 30px;
    line-height: 45px;
  }
  .subtotal-price {
    justify-content: center;
    align-items: flex-start;
    gap: 1.5px;
  }

  .btn {
    gap: 15px;
    display: grid;
    padding-block: 30px;
    grid-template-columns: 1fr;
    text-align: center;
    width: 100%;
    /* identical to box height */
  }
`;

export default CartTotals;
