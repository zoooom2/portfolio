import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styled from 'styled-components';
import { useCartContext } from '../../context/cart_context';
import { priceFormat } from '../../utils/constants';

const CartSummary = () => {
  const { cart, total_amount } = useCartContext();
  const [show, setShow] = useState(false);

  const content = cart.map((cartItem) => (
    <li key={cartItem.id}>
      <div className='name-size-quantity'>
        <div className='name'>{cartItem.name}</div>
        <div className='size-quantity'>
          {cartItem.size}-[{cartItem.amount}]
        </div>
      </div>
      <div className='price'>
        ₦
        {new Intl.NumberFormat({
          style: 'currency',
        }).format(cartItem.price)}
      </div>
    </li>
  ));
  return (
    <Wrapper>
      <div className='summary-title'>
        <h5 className='summary-header' onClick={() => setShow((x) => !x)}>
          Summary
          {show ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </h5>
        <h5 className='summary-total'>{priceFormat(total_amount)}</h5>
      </div>
      <ul className={show ? 'show' : null}>
        {content}
        <div className='dashed'></div>
        <li key={1}>
          <div className='subtotal'>Subtotal</div>
          <div className='subtotal-price'>{priceFormat(total_amount)}</div>
        </li>
        <li key={2}>
          <div className='shipping'>Shipping</div>
          <div className='shipping-price'>{priceFormat(0)}</div>
        </li>
        <div className='dashed'></div>
        <li key={3}>
          <div className='total'>Total</div>
          <div className='total-price'>{priceFormat(total_amount)}</div>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-block: 1em;

  .summary-title {
    display: grid;

    grid-template-columns: 8fr 2fr;
  }
  .summary-header {
    display: flex;
    align-items: center;
    font-family: 'Zilla Slab';
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.1em;
    gap: 0.5em;
    cursor: pointer;
  }
  .summary-total {
    display: flex;
    justify-content: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .size-quantity,
  .name {
    text-transform: capitalize;
  }
  ul {
    display: none;
  }
  .show {
    display: block;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: 0.5em;
    font-family: 'Zilla Slab';
    font-size: 21px;
    line-height: 25px;
    letter-spacing: 0.1em;
    gap: 2em;
  }
  .price,
  .subtotal-price,
  .shipping-price,
  .total-price {
    font-family: 'Poppins';
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */

    color: #000000;
  }
  .dashed {
    margin-block: 1.5em;
    border-bottom: 1.5px dashed #5c5c5c;
  }
  .subtotal,
  .shipping,
  .total {
    font-family: 'Blaak Thin PERSONAL USE';
    font-size: 21px;
    line-height: 28px;
    letter-spacing: 0.1em;
  }
`;
export default CartSummary;
