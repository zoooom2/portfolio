import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styled from 'styled-components';
import { priceFormat } from '../../../utils/constants';
import { useAppSelector } from '../../../App/hooks';

const CartSummary = () => {
  const { cart, total_amount, subtotal, shippingInfo } = useAppSelector(
    (state) => state.cart
  );
  const [show, setShow] = useState(false);

  const content = cart.map((cartItem, key) => (
    <li key={key} className='grid grid-cols-2'>
      <div className='name-size-quantity'>
        <div className='font-baz2 text-[14px] tracking-[1.4px] tablet:text-[21px] tablet:tracking-[2.1px]'>
          {cartItem.productName}
        </div>
        <div className='font-baz2 text-[14px] tablet:text-[21px] tracking-[1.4px] tablet:tracking-[2.1px]'>
          {cartItem.size}-[{cartItem.amount}]
        </div>
      </div>
      <div className='font-baz1 text-[16px] tablet:text-[24px] text-right'>
        {priceFormat(cartItem.price)}
      </div>
    </li>
  ));
  return (
    <Wrapper className='w-full tablet:py-[75px] py-[45px] border-t border-black border-dashed'>
      <div className='grid grid-cols-2'>
        <h5
          className='font-baz2 text-[16px] tablet:text-[24px] font-medium tracking-[1.6px] flex items-center'
          onClick={() => setShow((x) => !x)}>
          Summary
          {show ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </h5>
        <h5 className='font-baz1 text-[16px] font-semibold text-right tablet:text-[24px]'>
          {priceFormat(total_amount)}
        </h5>
      </div>
      <ul className={`${show ? 'show' : ''} pt-3`}>
        {content}
        <div className='dashed'></div>
        <li key={1}>
          <div className='subtotal text-[14px] tablet:text-[21px] tracking-[1.4px] tablet:tracking-[2.1px]'>
            Subtotal
          </div>
          <div className='font-baz1 text-[16px] tablet:text-[24px]'>
            {priceFormat(subtotal)}
          </div>
        </li>
        <li key={2}>
          <div className='shipping text-[14px] tablet:text-[21px] tracking-[1.4px] tablet:tracking-[2.1px]'>
            Shipping
          </div>
          <div className='font-baz1 text-[16px] tablet:text-[24px]'>
            {priceFormat(shippingInfo.shippingFee || 0)}
          </div>
        </li>
        <div className='dashed'></div>
        <li key={3}>
          <div className='total text-[14px] tablet:text-[21px] tracking-[1.4px] tablet:tracking-[2.1px]'>
            Total
          </div>
          <div className='font-baz1 text-[16px] tablet:text-[24px]'>
            {priceFormat(total_amount)}
          </div>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // width: 90%;
  display: flex;
  flex-direction: column;
  margin-block: 1em;

  .summary-title {
    display: grid;

    grid-template-columns: 8fr 2fr;
  }
  .summary-header {
    display: flex;
    align-items: center;
    font-family: 'Zilla Slab';
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.1em;
    gap: 0.5em;
    cursor: pointer;
  }
  .summary-total {
    display: flex;
    justify-content: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .size-quantity,
  .name {
    text-transform: capitalize;
  }
  ul {
    display: none;
  }
  .show {
    display: block;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: 0.5em;
    font-family: 'Zilla Slab';
    font-size: 21px;
    line-height: 25px;
    letter-spacing: 0.1em;
    gap: 2em;
  }
  .price,
  .subtotal-price,
  .shipping-price,
  .total-price {
    font-family: 'Poppins';
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */

    color: #000000;
  }
  .dashed {
    margin-block: 1.5em;
    border-bottom: 1.5px dashed #5c5c5c;
  }
  .subtotal,
  .shipping,
  .total {
    font-family: 'Blaak Thin PERSONAL USE';
  }
`;
export default CartSummary;
