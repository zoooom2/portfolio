import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';
import CartTotals from './CartTotals';

const CartContent = () => {
  const { cart, clearCart } = useCartContext();

  return (
    <Wrapper className='cart-container'>
      <section className='cartContent'>
        {cart.map((item, index) => (
          <section className='column-cart'>
            <CartItem key={item.id} {...item} />
          </section>
        ))}
      </section>
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.main`
  display: flex;
  width: 100%;
  .cartContent {
    width: 50%;
    border-right: 1px solid black;
    padding-block: 3em;
  }
  .column-cart {
    padding: 2em;
    border-bottom: 1px solid black;
    display: flex;
    height: 20em;
  }
`;
export default CartContent;
