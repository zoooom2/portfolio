import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  BillingInfo,
  CartSummary,
  CheckoutStage,
  Payment,
} from '../components';
import Shipping from '../components/Shipping';

const CheckoutPage = () => {
  const [stage, setStage] = useState(1);
  const { params } = useParams();

  return (
    <main>
      <Wrapper>
        <div className='pageHero'>
          <h3 className='pageName'>Checkout</h3>
          <button className='backToCart-btn'>Back to Cart</button>
        </div>
        <div className='details'>
          <CheckoutStage position={stage} />
          {params === 'information' && <BillingInfo setStage={setStage} />}
          {params === 'shipping' && <Shipping setStage={setStage} />}
          {params === 'payment' && <Payment setStage={setStage} />}
          <CartSummary />
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: 0;
  width: 100%;

  padding-block: 1em;
  .pageHero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-block: 0.8em;
    width: 100%;
    border-bottom: 1px solid black;
  }
  .pageName {
    font-family: 'Zilla Slab';
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    color: black;
    letter-spacing: 0.1em;
  }
  .backToCart-btn {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
  }
  .details {
    width: 40%;
    display: grid;
    place-items: center;
    @media (max-width: 720px) {
      width: 95%;
    }
  }
`;
export default CheckoutPage;
