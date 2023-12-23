import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  countCartTotal,
  updateCartTotal,
} from '../features/cartFeature/cartSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import {
  BillingInfo,
  CheckoutStage,
  Payment,
} from '../features/cartFeature/checkout';
import useLocalStorage from '../utils/customHooks/localStorage';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { params } = useParams();
  const [stage, setStage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_localStorageShipping, setLocalStorageShipping] = useLocalStorage(
    'shipping',
    []
  );

  const dispatch = useAppDispatch();
  const { shippingInfo } = useAppSelector((state) => state.cart);
  // const

  useEffect(() => {
    document.title = 'Checkout | Baz Official Store';
  }, []);

  useEffect(() => {
    dispatch(updateCartTotal());
    dispatch(countCartTotal());
  }, []);

  useEffect(() => {
    setLocalStorageShipping(shippingInfo);
  }, [shippingInfo]);

  return (
    <main>
      <Wrapper className='flex-column place-center'>
        <div className='flex flex-col items-center py-[45px] justify-center border-b w-full border-black'>
          <h3 className='pageName'>Checkout</h3>
          <Link to={'/cart'} className='backToCart-btn'>
            Back to Cart
          </Link>
        </div>
        <div className='details'>
          <CheckoutStage position={stage} />
          {params === 'information' && <BillingInfo setStage={setStage} />}
          {params === 'payment' && (
            <Payment setStage={setStage} shippingInfo={shippingInfo} />
          )}
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
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

    // padding-inline: 1em;
    @media (min-width: 480px) {
      // width: 95%;
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
