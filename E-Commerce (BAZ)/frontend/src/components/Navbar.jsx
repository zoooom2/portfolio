import React from 'react';
import styled from 'styled-components';
import logo from '../assets/image 2.svg';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { links } from '../utils/constants';
import CartButtons from './CartButtons';
import { useProductsContext } from '../context/products_context';
import { useUserContext } from '../context/user_context';

const Nav = () => {
  const { openSidebar } = useProductsContext();
  const navlinks = links.map((link) => {
    return (
      <li key={link.id}>
        <Link to={link.url}>{link.text}</Link>
      </li>
    );
  });
  return (
    <NavContainer className='place-center'>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <div type='button' className='nav-toggle'>
            <CartButtons />
            <FaBars onClick={openSidebar} />
          </div>
        </div>
        <ul className='nav-links'>{navlinks}</ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  display: flex;
  padding-top: 2em;
  padding-bottom: 0.5em;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: white;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 90px;
      height: 70px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      align-items: flex-start;
      gap: 32px;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-weight: 600;
        font-size: 20px;
        font-family: Zilla Slab, serif;
        letter-spacing: 0.1em;
        line-height: 24px;
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Nav;
