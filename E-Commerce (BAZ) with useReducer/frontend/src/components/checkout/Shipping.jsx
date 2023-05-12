import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../../context/cart_context';
import { priceFormat } from '../../utils/constants';

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
    shippingMethod,
  } = shippingInfo;

  const handleChange = (e) => {
    updateShipping('shippingMethod', e.target.id);
    updateShipping('shippingFee', +e.target.value);
  };

  useEffect(() => {
    setStage(2);
  }, []);
  return (
    <Wrapper className='flex-column'>
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
              value={4000}
              checked={shippingMethod === 'home'}
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
              value={2000}
              checked={shippingMethod === 'park'}
              onChange={handleChange}
            />
            <label htmlFor='park' className='park'>
              Park delivery
            </label>
          </div>
          <div className='form-price'>{priceFormat(2000)} </div>
        </div>
      </div>
      <Link to='/checkout/payment' className='btn zilla-700'>
        Proceed To Payment
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-block: 3em;
  @media (min-width: 1100px) {
    width: 60%;
  }
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
  .btn {
    margin-top: 1em;
    /* identical to box height */
    text-align: center;
  }
  .form-price {
    font-family: 'Poppins';
    font-size: 21px;
    line-height: 32px;
  }
`;
export default Shipping;
