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
        <div className='price'>
          ₦
          {new Intl.NumberFormat({
            style: 'currency',
          }).format(total_amount)}
        </div>
      </div>
      <Conditions />
      <div className='toCheckout'>
        <Link to='/checkout/information' className='checkout-btn'>
          Checkout
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5em;
  .subtotal {
    font-family: 'Bell MT';
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 23px;
  }
  .price {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 45px;
  }
  .subtotal-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1.5px;
  }

  .checkout-btn {
    gap: 15px;
    display: grid;
    padding-block: 30px;
    grid-template-columns: 1fr;
    text-align: center;
    width: 100%;
    font-family: 'Zilla Slab';
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    border: 1.5px solid black;
    background: transparent;
    transition: var(--transition);
    &:hover {
      color: white;
      background-color: black;
    }
    /* identical to box height */
    color: #000000;
  }
`;

export default CartTotals;
