import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../App/hooks';
import { CartContent } from '../features/cartFeature/cart';

const CartPage = () => {
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    document.title = 'Cart | Baz Official Store';
  }, []);

  if (cart.length < 1) {
    return (
      <Wrapper className=''>
        <div className='flex flex-col items-center py-[45px] justify-center border-b w-full border-black'>
          <h3 className='pageName'>Shopping Cart</h3>
          <Link to='/shop' className='shopping-btn'>
            Continue Shopping
          </Link>
        </div>
        <div className='empty flex-column place-center'>
          <h2 className='empty-message'>Your cart is empty</h2>
          <Link to='/shop' className='fill-btn'>
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper className='page flex-column'>
      <div className='flex flex-col items-center py-[45px] justify-center border-b w-full border-black'>
        <h3 className='pageName'>Cart</h3>
        <Link to='/shop' className='shopping-btn'>
          Continue Shopping
        </Link>
      </div>
      <CartContent />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  // padding-block: 0.5rem;
  align-items: center;
  .pageHero {
    padding-block: 0.8em;
    align-items: center;
    border-bottom: 1px solid black;
    width: 100%;
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
  .shopping-btn {
    font-family: 'Poppins';
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
  }
  .empty {
    width: 100%;
    border-top: 1px solid black;
    height: 50vh;
  }
  .empty-message {
    font-family: 'Zilla Slab';
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1em;
    color: #000000;
  }
  .fill-btn {
    font-family: 'Bell MT';
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */
    text-decoration-line: underline;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
  }
`;

export default CartPage;
