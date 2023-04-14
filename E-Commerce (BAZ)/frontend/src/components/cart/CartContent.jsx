import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../context/cart_context';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';
import CartTotals from './CartTotals';

const CartContent = () => {
  const { cart, clearCart } = useCartContext();

  return (
    <Wrapper className='cart-container'>
      <section className='cartContent'>
        {cart.map((item, index) => (
          <section key={index} className='column-cart'>
            <CartItem {...item} />
          </section>
        ))}
      </section>
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  .cartContent {
    border-right: 1px solid black;
    padding-block: 3em;
    @media (max-width: 768px) {
      padding-block: 1em;
    }
  }
  .column-cart {
    padding: 2em;
    display: flex;
  }
`;
export default CartContent;
