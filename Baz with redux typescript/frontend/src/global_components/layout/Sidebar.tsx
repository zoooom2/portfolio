// import logo from '../../assets/image 2.svg';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
// import { links } from '../../utils/constants';
import styled from 'styled-components';
import { closeSidebar } from '../../features/productFeature/productSlice';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
// import { CartButtons } from '../../features/cartFeature/cart';
import { sideBarLinks } from '../../types';
import { BAZLogo } from '../../utils/constants';

const Sidebar = ({
  navLinks,
  footerButtons,
}: {
  navLinks: sideBarLinks[];
  footerButtons: JSX.Element;
}) => {
  const dispatch = useAppDispatch();

  const { isSidebarOpen } = useAppSelector((state) => state.product);

  return (
    <SidebarContainer>
      <aside
        className={`${
          isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'
        } flex flex-col justify-center`}>
        <div className='sidebar-header justify-end absolute right-2 top-2'>
          <button
            type='button'
            className='close-btn'
            onClick={() => dispatch(closeSidebar())}>
            <FaTimes />
          </button>
        </div>
        <div className='flex flex-col items-center gap-[60px] justify-center'>
          <div className='w-[130px] flex justify-center aspect-[130/101]'>
            <img src={BAZLogo} alt='logo' className='w-full' />
          </div>
          <ul className='flex flex-col gap-[32px] font-baz2 text-[20px] font-semibold tracking-[2px] capitalize'>
            {navLinks.map(({ id, text, url }) => {
              return (
                <li key={id}>
                  <Link to={url} onClick={() => dispatch(closeSidebar())}>
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
          {footerButtons}
          {/* <CartButtons /> */}
        </div>
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    // margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: center;
    font-size: 1rem;
    text-transform: capitalize;
    // padding: 1rem 1.5rem;
    gap: 32px;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
