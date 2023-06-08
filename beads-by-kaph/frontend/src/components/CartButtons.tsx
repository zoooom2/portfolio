import React from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { auth_url, auth_url as url } from '../utils/constants';
import axios from 'axios';

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { total_items } = useCartContext();
  const { isAuthenticated, logOut } = useUserContext();

  const logOutUser = async () => {
    logOut();
    closeSidebar();
  };
  return (
    <Wrapper className="cart-btn-wrapper">
      <Link to="cart" className="cart-btn" onClick={closeSidebar}>
        <span className="cart-container">
          <FaShoppingCart />
          <span className="cart-value">{total_items}</span>
        </span>
      </Link>

      {isAuthenticated ? (
        <button type="button" className="auth-btn" onClick={logOutUser}>
          <FaUserMinus />
        </button>
      ) : (
        <Link to="/login">
          <button type="button" className="auth-btn" onClick={closeSidebar}>
            <FaUserPlus />
          </button>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel&display=swap');
  display: grid;
  grid-template-columns: 1fr 1fr;
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
