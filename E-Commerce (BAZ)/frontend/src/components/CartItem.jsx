import React, { useState } from 'react';
import styled from 'styled-components';
import { formatPrice } from '../utils/helpers';
import AmountButtons from './AmountButtons';
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import { priceFormat } from '../utils/constants';

const CartItem = ({ id, image, name, price, size }) => {
  const { removeItem, setAmount } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    // let value;
    // if (e.target.value && e.target.value > 0) {
    //   value = e.target.value;
    //   if (value > 500) {
    //     value = 500;
    //   }
    //   setQuantity(value);
    //   setAmount(id, value);
    // } else {
    //   setQuantity('');
    //   setAmount(id, 0);
    // }
  };

  return (
    <Wrapper>
      <img src={image} alt='' className='productImage' />
      <div className='product-details flex-column '>
        <div className='name'>{name}</div>
        <div className='size'>Size: {size}</div>
        <div className='price'>{priceFormat(price)}</div>
        <div className='quantityForm-remove flex-column'>
          <div className='quantityForm flex-column'>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              name='quantity'
              id='quantity'
              max={100}
              value={quantity}
              className='quantity'
              onChange={handleChange}
            />
          </div>
          <button className='remove-btn' onClick={() => removeItem(id)}>
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
  gap: 2em;

  .productImage {
    width: 50%;
  }
  input {
    margin-block: 0;
  }
  .product-details {
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    gap: 10px;
  }
  .name-size {
    font-family: 'Zilla Slab';
    font-size: 21px;
    line-height: 25px;
    letter-spacing: 0.1em;
  }
  .name {
    font-family: 'Bell-MT';
    font-size: 20px;
    line-height: 45px;
    text-transform: capitalize;
  }

  .price {
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */
    color: #000000;
  }
  label {
    font-family: 'Bell MT';
    font-size: 15px;
    line-height: 17px;
    /* identical to box height */
    color: #000000;
  }
  .quantityForm-remove {
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
  }
  .quantityForm {
    align-items: flex-start;
    padding: 0px;
    gap: 6px;
  }
  .size {
    font-family: 'Bell MT';
    font-size: 15px;
    line-height: 27px;
    text-transform: capitalize;
  }
  .quantity {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 4.5px 7.5px;
    border: 1.5px solid #757575;
    border-radius: 1.5px;
    font-family: 'Bell MT';
    font-size: 24px;
    line-height: 27px;
    /* identical to box height */
    letter-spacing: 0.1em;
    width: 100px;
  }
  .remove-btn {
    font-family: 'Bell MT';
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
