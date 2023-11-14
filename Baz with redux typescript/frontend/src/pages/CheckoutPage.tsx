import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { setClicked } from '../features/userFeature/userSlice';

import {
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import {
  BillingInfo,
  CheckoutStage,
  Payment,
  // Shipping,
} from '../features/cartFeature/checkout';
// import { CartSummary } from '../features/cartFeature/cart';

const CheckoutPage = () => {
  const { params } = useParams();
  const [stage, setStage] = useState(1);
  const dispatch = useAppDispatch();
  const { shippingInfo } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(setClicked(true));
    document.title = 'Checkout | Baz Official Store';
  }, []);

  useEffect(() => {
    dispatch(updateCartTotal());
    dispatch(countCartTotal());
  }, []);

  return (
    <main>
      <Wrapper className='flex-column place-center'>
        <div className='pageHero flex-column place-center'>
          <h3 className='pageName'>Checkout</h3>
          <button className='backToCart-btn'>Back to Cart</button>
        </div>
        <div className='details'>
          <CheckoutStage position={stage} />
          {params === 'information' && <BillingInfo setStage={setStage} />}
          {/* {params === 'shipping' && (
            <Shipping setStage={setStage} shippingInfo={localShipping} />
          )} */}
          {params === 'payment' && (
            <Payment setStage={setStage} shippingInfo={shippingInfo} />
          )}
          {/* <CartSummary /> */}
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  margin-inline: 0;
  width: 100%;
  padding-block: 1em;
  .pageHero {
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
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
  }
  .details {
    width: 100%;
    display: grid;
    place-items: center;

    padding-inline: 1em;
    @media (min-width: 480px) {
      width: 95%;
    }
    @media (min-width: 768px) {
      width: 70%;
    }
    @media (min-width: 1024px) {
      width: 50%;
    }
  }
`;
export default CheckoutPage;
