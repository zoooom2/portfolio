import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';

const CartPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='pageHero'>
          <h3 className='pageName'>Shopping Cart</h3>
          <button className='shopping-btn'>Continue Shopping</button>
        </div>
        <div className='empty'>
          <h2 className='empty-message'>Your cart is empty</h2>
          <Link to='/shop' className='fill-btn'>
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper className='page'>
      <div className='pageHero'>
        <h3 className='pageName'>Cart</h3>
        <button className='shopping-btn'>Continue Shopping</button>
      </div>
      <CartContent />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding-block: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pageHero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-block: 0.8em;
    border-bottom: 1px solid black;
    width: 100%;
  }
  .pageName {
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    color: black;
    letter-spacing: 0.1em;
  }
  .shopping-btn {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
  }
  .empty {
    width: 100%;
    border-top: 1px solid black;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .empty-message {
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1em;
    color: #000000;
  }
  .fill-btn {
    font-family: 'Bell MT';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
  }
`;

export default CartPage;
