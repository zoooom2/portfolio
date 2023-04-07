import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { priceFormat } from '../utils/constants';

const Payment = ({ setStage }) => {
  const { shippingInfo, handlePayStack } = useCartContext();
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    country,
    phoneNumber,
    shippingFee,
    shippingMethod,
  } = shippingInfo;

  useEffect(() => {
    setStage(3);
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
      </div>
      <div className='dashed'></div>
      <div className='shippingMethod'>{shippingMethod}</div>
      <div className='shippingFee'>{priceFormat(shippingFee)}</div>
      <button className='btn zilla-700' onClick={handlePayStack}>
        Pay Now
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  margin-block: 3em;
  width: 60%;
  .personal-info,
  .location {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2em;
  }

  .personal-info > *,
  .location > *,
  .shippingMethod,
  .shippingFee {
    font-family: 'Poppins';
    font-size: 15px;
    line-height: 32px;
    /* identical to box height */
    text-transform: uppercase;
    color: #5c5c5c;
  }
  .btn {
    width: 100%;
    margin-top: 2em;
    font-size: 24px;
  }
`;
export default Payment;
