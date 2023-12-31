import { KeyboardEvent, MouseEvent, useCallback, useEffect } from 'react';
import { handlePayStack } from '../cartSlice';
import styled from 'styled-components';
import { SpinnerCircular } from 'spinners-react';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { CartShippingTypes } from '../../../types';
import { CartSummary } from '../cart';

const Payment = ({
  setStage,
  shippingInfo,
}: {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  shippingInfo: CartShippingTypes;
}) => {
  const dispatch = useAppDispatch();
  const {
    // shippingInfo,
    cart,
    total_amount,
    total_items,
    subtotal,
    loading,
  } = useAppSelector((state) => state.cart);
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

  const handlePayment = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
      e.preventDefault();

      dispatch(
        handlePayStack({
          shippingInfo,
          cart: cart.filter((c) => c.amount > 0),
          total_amount,
          total_items,
          subtotal,
        })
      );
    },
    [cart, shippingInfo, subtotal, total_amount, total_items]
  );

  useEffect(() => {
    setStage(3);
  }, []);

  return (
    <Wrapper className='flex-column w-full tablet:w-4/5 max-tablet:px-[26px] pt-12'>
      <div className='personal-info '>
        <div className='info'>
          <div className='text-[16px] font-baz1 text-[#5c5c5c] tablet:text-[21px]'>
            {lastName} {firstName}
          </div>
          <div className='text-[16px] font-baz1 text-[#5c5c5c] tablet:text-[21px]'>
            {email}
          </div>
          <div className='text-[16px] font-baz1 text-[#5c5c5c] tablet:text-[21px]'>
            {phoneNumber}
          </div>
        </div>
      </div>
      <div className='dashed'></div>
      <div className='location pb-4'>
        <div className='actual-location'>
          <div className='text-[16px] font-baz1 text-[#5c5c5c] tablet:text-[21px]'>
            {address}
          </div>
          <div className='text-[16px] font-baz1 text-[#5c5c5c] tablet:text-[21px]'>
            {city}, {state}
          </div>
          <div className='text-[16px] font-baz1 text-[#5c5c5c] tablet:text-[21px]'>
            {country}
          </div>
        </div>
      </div>
      {/* <div className='dashed'></div> */}
      <CartSummary />
      <button
        disabled={!subtotal}
        className='w-full laptop:w-3/5 self-center zilla-700 flex justify-center items-center border border-black py-[20px] hover:text-baz-white hover:bg-baz-black tablet:text-[24px] text-[16px]'
        onClick={handlePayment}>
        {loading ? (
          <SpinnerCircular secondaryColor={'#000'} color='white' size={35} />
        ) : (
          'Pay Now'
        )}
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
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
    text-transform: uppercase;
    color: #5c5c5c;
  }
`;
export default Payment;
