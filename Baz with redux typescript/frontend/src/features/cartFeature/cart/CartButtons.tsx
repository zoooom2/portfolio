import {
  FiSearch,
  FiUserMinus,
  FiUserPlus,
  FiShoppingCart,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { closeSidebar } from '../../productFeature/productSlice';
import { logOut } from '../../userFeature/userSlice';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';

const CartButtons = () => {
  const dispatch = useAppDispatch();
  const { total_items } = useAppSelector((state) => state.cart);
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const logOutUser = async () => {
    dispatch(logOut());
    dispatch(closeSidebar());
  };
  return (
    <Wrapper className='cart-btn-wrapper'>
      <button
        type='button'
        className='auth-btn'
        onClick={() => dispatch(closeSidebar())}>
        <FiSearch />
      </button>
      <Link
        to='cart'
        className='cart-btn'
        onClick={() => dispatch(closeSidebar())}>
        <span className='cart-container'>
          <FiShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>

      {isAuthenticated ? (
        <button type='button' className='auth-btn' onClick={logOutUser}>
          <FiUserMinus />
        </button>
      ) : (
        <Link to='/login'>
          <button
            type='button'
            className='auth-btn'
            onClick={() => dispatch(closeSidebar())}>
            <FiUserPlus />
          </button>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel&display=swap');
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5em;
  align-items: center;
  width: 100px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;
    font-family: 'Cinzel', serif;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 10px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
    font-family: 'Cinzel', serif;
  }
`;
export default CartButtons;
