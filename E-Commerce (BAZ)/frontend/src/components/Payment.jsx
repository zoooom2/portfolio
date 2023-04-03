import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';

const Payment = ({ setStage }) => {
  const { shippingInfo } = useCartContext();
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

  useEffect(() => {
    setStage(3);
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
`;
export default Payment;
