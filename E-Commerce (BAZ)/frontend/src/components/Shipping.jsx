import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { priceFormat } from '../utils/constants';

const Shipping = ({ setStage }) => {
  const { shippingInfo, updateShipping } = useCartContext();
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    country,
    phoneNumber,
  } = shippingInfo;

  const handleChange = (e) => {
    const data = e.target.value.split('-');
    updateShipping('shippingMethod', `${data[0]} delivery`);
    updateShipping('shippingFee', `${+data[1]}`);
  };

  useEffect(() => {
    setStage(2);
  }, []);
  return (
    <Wrapper>
      <div className='personal-info'>
        <div className='info'>
          <div className='full-name'>
            {lastName} {firstName}
          </div>
          <div className='email'>{email}</div>
          <div className='phoneNumber'>{phoneNumber}</div>
        </div>
        <Link to='/checkout/information' className='edit'>
          edit
        </Link>
      </div>
      <div className='dashed'></div>
      <div className='location'>
        <div className='actual-location'>
          <div className='address'>{address}</div>
          <div className='city-state'>
            {city}, {state}
          </div>
          <div className='country'>{country}</div>
        </div>
        <Link to='/checkout/information' className='edit'>
          edit
        </Link>
      </div>
      <div className='solid-line'></div>
      <div className='shipping-method'>
        <div className='delivery-method'>
          <div className='delivery-form'>
            <input
              type='radio'
              name='delivery'
              id='home'
              value='Home-4000'
              onChange={handleChange}
            />
            <label htmlFor='home' className='home'>
              Home delivery
            </label>
          </div>
          <div className='form-price'>{priceFormat(4000)}</div>
        </div>
        <div className='delivery-method'>
          <div className='delivery-form'>
            <input
              type='radio'
              name='delivery'
              id='park'
              value='Park-2000'
              onChange={handleChange}
            />
            <label htmlFor='park' className='park'>
              Park delivery
            </label>
          </div>
          <div className='form-price'>{priceFormat(2000)} </div>
        </div>
      </div>
      <Link to='/checkout/payment' className='payment-btn'>
        Proceed To Payment
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-block: 3em;
  display: flex;
  flex-direction: column;

  .personal-info,
  .location {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2em;
  }
  .dashed {
    margin-block: 2em;
    border-bottom: 1.5px dashed #5c5c5c;
  }
  .solid-line {
    margin-block: 3em;
    border-bottom: 1.5px solid #000;
  }
  .personal-info > *,
  .location > * {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 32px;
    /* identical to box height */
    text-transform: uppercase;
    color: #5c5c5c;
  }
  .delivery-method {
    display: flex;
    justify-content: space-between;

    align-items: center;
    margin-bottom: 1.5em;
  }
  .delivery-form {
    display: flex;
    gap: 1em;
  }
  .home,
  .park {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 32px;
  }
  input {
    width: 1.8em;
    color: black;
  }
  .edit {
    background: transparent;
    border: none;
    text-transform: lowercase;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height */
    text-decoration-line: underline;

    color: #5c5c5c;
  }
  .payment-btn {
    border: 1px solid black;
    font-family: 'Zilla Slab';
    margin-top: 1em;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    color: #000000;
    text-align: center;
    padding-block: 1em;
    transition: var(--transition);
    &:hover {
      color: white;
      background-color: #000000;
    }
  }
  .form-price {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 32px;
  }
`;
export default Shipping;
