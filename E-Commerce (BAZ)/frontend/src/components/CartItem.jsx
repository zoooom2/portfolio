import React from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import AmountButtons from './AmountButtons';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';

const CartItem = ({ id, image, name, price, size }) => {
  const { removeItem, toggleAmount } = useCartContext();
  const increase = () => {
    toggleAmount(id, 'inc');
  };
  const decrease = () => {
    toggleAmount(id, 'dec');
  };
  return (
    <Wrapper>
      <img src={`/productImage/${image}`} alt='' className='productImage' />
      <div className='product-details'>
        <div className='name-size'>{`${name}-${size}`}</div>
        <div className='price'>₦{price}</div>
        <div className='quantityForm-remove'>
          <div className='quantityForm'>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              name='quantity'
              id='quantity'
              className='quantity'
            />
          </div>
          <button className='remove-btn' onClick={removeItem}>
            Remove
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 27px;
  .productImage {
    width: 50%;
  }

  .product-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    gap: 13.5px;
  }
  .name-size {
    font-family: 'Zilla Slab';
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 25px;
    letter-spacing: 0.1em;
  }
  .price {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */
    color: #000000;
  }
  label {
    font-family: 'Bell MT';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    /* identical to box height */
    color: #000000;
  }
  .quantityForm-remove {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
  }
  .quantityForm {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 6px;
  }
  .quantity {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 4.5px 7.5px;
    border: 1.5px solid #757575;
    border-radius: 1.5px;
    font-family: 'Bell MT';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 27px;
    /* identical to box height */
    letter-spacing: 0.1em;
    width: 100px;
  }
  .remove-btn {
    font-family: 'Bell MT';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    /* identical to box height */
    text-decoration-line: underline;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export default CartItem;
