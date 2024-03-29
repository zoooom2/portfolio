import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BAZLogo, links } from '../../utils/constants';
import { openSidebar } from '../../features/productFeature/productSlice';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { BsSearch } from 'react-icons/bs';
import {
  closeSearchBar,
  updateFilters,
} from '../../features/filterFeature/filterSlice';
import { ChangeEvent } from 'react';

const Nav = ({ buttons, admin }: { buttons: JSX.Element; admin: boolean }) => {
  const dispatch = useAppDispatch();

  const { openSearchBar } = useAppSelector((state) => state.filter);
  const { adminRoute } = useAppSelector((state) => state.admin);
  const navlinks = links.map((link) => {
    return (
      <li key={link.id}>
        <Link to={link.url}>{link.text}</Link>
      </li>
    );
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(updateFilters({ name: 'text', value: value.toLowerCase() }));
  };
  const hideSearchBar = () => {
    dispatch(updateFilters({ name: 'text', value: '' }));
    dispatch(closeSearchBar());
  };
  return (
    <NavContainer className='place-center bg-baz-white flex flex-col gap-4 pb-[18px]'>
      <div className={admin ? 'admin-nav-center' : 'nav-center'}>
        <div className='flex items-center justify-between'>
          <Link to={adminRoute ? '/admin' : '/'} className='h-[80px]'>
            <img src={BAZLogo} alt='logo' className='object-contain h-full' />
          </Link>
          <div className='nav-toggle'>
            <FaBars
              className='text-baz-black '
              onClick={() => dispatch(openSidebar())}
            />
          </div>
        </div>
        {!admin && <ul className='nav-links'>{navlinks}</ul>}

        {buttons}
      </div>
      <div
        className={`search-container w-full border-t border-black ${
          !openSearchBar && 'hidden'
        }`}>
        <input
          type='text'
          className='search-input w-full outline-none border-none pt-[25px]'
          placeholder='what are you looking for'
          onChange={handleChange}
        />
        <i className='search-icon'>
          <BsSearch />
        </i>
        <button className='close-icon text-baz-danger' onClick={hideSearchBar}>
          <FaTimes />
        </button>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  // display: flex;
  padding-top: 2em;
  // padding-bottom: 0.5em;
  background: #f9f8f8;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  .nav-center,
  .admin-nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
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
    .admin-nav-center {
      display: flex;
      justify-content: space-between;
    }
    .nav-links {
      display: flex;
      align-items: flex-start;
      gap: 48px;
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
  .search-container {
    position: relative;
  }

  .search-input {
    padding-left: 70px; /* Adjust as needed */
    border-inline: none;
    // border-bottom: none;
  }

  .search-icon {
    position: absolute;
    left: 30px; /* Adjust as needed */
    top: 60%;
    transform: translateY(-50%);
  }
  .close-icon {
    position: absolute;
    right: 30px; /* Adjust as needed */
    top: 60%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

export default Nav;
